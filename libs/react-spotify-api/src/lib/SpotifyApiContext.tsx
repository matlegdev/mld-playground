import { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';

export interface SpotifyApiContextProps {
  /** The axios instance configured to be used with the Spotify API. */
  axios: AxiosInstance;
}

export const SpotifyApiContext = createContext<SpotifyApiContextProps | undefined>(undefined);

export const useSpotifyApi = (): SpotifyApiContextProps => {
  const context = useContext(SpotifyApiContext);
  if (context == null) {
    throw new Error('Cannot use context, make sure you have wrapped your application with SpotifyApiProvider.');
  }
  return context;
};
