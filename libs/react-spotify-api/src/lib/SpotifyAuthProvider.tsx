import { ReactNode, useEffect, useState } from 'react';
import { SpotifyAuthContext } from './SpotifyAuthContext';
import { User, UserManager } from 'oidc-client';
import { SpotifyAuthConstants } from './spotifyAuthConstants';

function getCode() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(SpotifyAuthConstants.CallbackCodeParam);
}

function removeCallbackInfoFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete(SpotifyAuthConstants.CallbackCodeParam);
  url.searchParams.delete(SpotifyAuthConstants.CallbackStateParam);
  window.history.replaceState(null, window.name, url.pathname);
}

function buildUserManager(clientId: string, scopes: string[]): UserManager {
  return new UserManager({
    authority: SpotifyAuthConstants.Authority,
    metadata: {
      authorization_endpoint: SpotifyAuthConstants.AuthorizationEndpoint,
      token_endpoint: SpotifyAuthConstants.TokenEndpoint,
    },
    client_id: clientId,
    scope: scopes?.join(' '),
    loadUserInfo: true,
    redirect_uri: window.location.origin,
    response_type: 'code',
    response_mode: 'query',
  });
}

export interface SpotifyAuthProviderProps {
  /** A custom UserManager to use instead of the pre-configured one. If set, all other properties will be ignored. */
  userManager?: UserManager;
  /** The Spotify client id of the application. Must be set if a custom UserManager is not provided. */
  clientId?: string;
  /** The list of scope to require for the application. Must be set if a custom UserManager is not provided. */
  scopes?: string[];
  children: ReactNode;
}

export const SpotifyAuthProvider = (props: SpotifyAuthProviderProps) => {
  const { clientId, scopes, children } = props;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userManager, setUserManager] = useState<UserManager | null>(null);

  useEffect(() => {
    if (props.userManager != null) {
      setUserManager(props.userManager);
    } else {
      setUserManager(buildUserManager(clientId ?? '', scopes ?? []));
    }
  }, [clientId, scopes]);

  useEffect(() => {
    if (userManager == null) {
      return;
    }

    const getUser = async () => {
      const code = getCode();
      if (code != null && code !== '') {
        const user = await userManager.signinRedirectCallback();
        setUser(user);
        setIsSignedIn(true);
        removeCallbackInfoFromUrl();
        return;
      }

      const user = await userManager.getUser();
      if (user != null && !user.expired) {
        setUser(user);
        setIsSignedIn(true);
      }
    };

    getUser();
  }, [userManager]);

  useEffect(() => {
    if (userManager == null) {
      return;
    }

    const updateUser = async () => {
      const user = await userManager.getUser();
      setUser(user);
    };

    userManager.events.addUserLoaded(updateUser);

    return () => userManager.events.removeUserLoaded(updateUser);
  }, [userManager]);

  const signIn = async () => {
    if (userManager == null) {
      return;
    }

    await userManager.signinRedirect();
  };

  return <SpotifyAuthContext.Provider value={{ user, isSignedIn, signIn }}>{children}</SpotifyAuthContext.Provider>;
};
