import { ReactNode } from 'react';
import { SpotifyApiContext } from './SpotifyApiContext';
import axios, { AxiosInstance } from 'axios';
import { SpotifyApiConstants } from './SpotifyApiConstants';

export interface SpotifyApiProviderProps {
  /** Optional axios instance. Will override the pre-configured axios instance. */
  axiosInstance?: AxiosInstance;
  children: ReactNode;
}

const axiosInstance = axios.create({
  baseURL: SpotifyApiConstants.BaseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const key = Object.keys(sessionStorage).find((key) => key.startsWith('oidc.user:https://accounts.spotify.com:'));
  if (key == null) {
    return config;
  }

  const item = sessionStorage.getItem(key);
  if (item == null) {
    return config;
  }

  const token = JSON.parse(item).access_token;
  if (token == null) {
    return config;
  }

  config.headers = { authorization: `Bearer ${token}` };

  return config;
});

export const SpotifyApiProvider = (props: SpotifyApiProviderProps) => {
  const { children } = props;

  return (
    <SpotifyApiContext.Provider value={{ axios: props?.axiosInstance ?? axiosInstance }}>
      {children}
    </SpotifyApiContext.Provider>
  );
};
