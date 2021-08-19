import { useSpotifyApi } from '../SpotifyApiContext';
import useSWR from 'swr';
import { PagingObject } from '../models/pagingObject';
import { TrackObject } from '../models/trackObject';

export type UserTopTracksTimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface UserTopTracksProps {
  time_range?: UserTopTracksTimeRange;
  limit?: number;
  offset?: number;
}

export const useUserTopTracks = (props?: UserTopTracksProps) => {
  const { axios } = useSpotifyApi();

  const { data, error } = useSWR<PagingObject<TrackObject>>(
    ['me/top/tracks', props?.time_range, props?.limit, props?.offset],
    (url: string, time_range: number, limit: number, offset: number) =>
      axios.get(url, { params: { time_range, limit, offset } }).then((res) => res.data)
  );

  return { data, error };
};
