import { useSpotifyApi } from '../SpotifyApiContext';
import useSWR from 'swr';
import { PagingObject } from '../models/pagingObject';
import { TrackObject } from '../models/trackObject';
import { SWRConfiguration } from 'swr/dist/types';

export type UserTopTracksTimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface UserTopTracksProps {
  time_range?: UserTopTracksTimeRange;
  limit?: number;
  offset?: number;
  config?: SWRConfiguration<PagingObject<TrackObject>, unknown>;
}

export const useUserTopTracks = (props?: UserTopTracksProps) => {
  const { axios } = useSpotifyApi();

  const { data, error, isValidating } = useSWR<PagingObject<TrackObject>>(
    ['me/top/tracks', props?.time_range, props?.limit, props?.offset],
    (url: string, time_range: number, limit: number, offset: number) =>
      axios.get(url, { params: { time_range, limit, offset } }).then((res) => res.data),
    props?.config
  );

  return { data, error, isValidating };
};
