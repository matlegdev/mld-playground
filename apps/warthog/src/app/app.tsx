import { ChakraProvider, useTimeout } from '@chakra-ui/react';
import { theme } from '../themes/dark-theme';
import { SpotifyApiProvider, SpotifyAuthProvider, useSpotifyAuth } from '@mld/react-spotify-api';
import { MyTopTracksPage } from '@mld/warthog/my-top-tracks/feature';
import { Layout } from '@mld/warthog/shell/ui';
import { FunctionComponent } from 'react';

const ShowIfLoggedIn: FunctionComponent = ({ children }) => {
  const { isSignedIn, signIn } = useSpotifyAuth();

  // dirty hack so that we have some time to check whether the user is already authenticated
  useTimeout(() => {
    if (!isSignedIn) {
      signIn();
    }
  }, 500);
  return <div>{isSignedIn && children}</div>;
};

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <SpotifyAuthProvider clientId={'554791a6a71b45e0a58a7105d15c6487'} scopes={['user-top-read']}>
        <SpotifyApiProvider>
          <ShowIfLoggedIn>
            <Layout>
              <MyTopTracksPage />
            </Layout>
          </ShowIfLoggedIn>
        </SpotifyApiProvider>
      </SpotifyAuthProvider>
    </ChakraProvider>
  );
}

export default App;
