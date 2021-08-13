import { useSpotifyApi } from '../SpotifyApiContext';
import useSWR from 'swr';

export interface UserTopProps {
  time_range?: 'short_term' | 'medium_term' | 'long_term';
  limit?: number;
  offset?: number;
}

export const useUserTopTracks = (props?: UserTopProps) => {
  const { axios } = useSpotifyApi();

  const { data, error } = useSWR(
    ['me/top/tracks', props?.time_range, props?.limit, props?.offset],
    (url: string, time_range: number, limit: number, offset: number) =>
      axios.get(url, { params: { time_range, limit, offset } }).then((res) => res.data)
  );

  return { data, error };
};
