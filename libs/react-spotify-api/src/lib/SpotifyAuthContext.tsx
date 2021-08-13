import { createContext, useContext } from 'react';
import { User } from 'oidc-client';

export type SpotifyAuthContextProps = {
  /** Function to trigger a sign-in to Spotify. */
  signIn: () => Promise<void>;
  /** The user if authenticated, null otherwise. */
  user?: User | null;
  /** Whether an user is signed in. */
  isSignedIn: boolean;
};

export const SpotifyAuthContext = createContext<SpotifyAuthContextProps | undefined>(undefined);

export const useSpotifyAuth = (): SpotifyAuthContextProps => {
  const context = useContext(SpotifyAuthContext);
  if (context == null) {
    throw new Error('Cannot use context, make sure you have wrapped your application with SpotifyAuthProvider.');
  }
  return context;
};
