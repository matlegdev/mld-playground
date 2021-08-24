import { PagingObject, TrackObject, UserTopTracksTimeRange, useUserTopTracks } from '@mld/react-spotify-api';
import { TrackCardList, TrackCardProps } from '@mld/warthog/my-top-tracks/ui';

function toTracksProps(data?: PagingObject<TrackObject>): TrackCardProps[] {
  if (!data) {
    return [];
  }

  return (
    data.items.map((item) => ({
      imgUrl: item.album?.images[0]?.url,
      trackName: item.name,
      artistName: item.artists[0]?.name,
    })) ?? []
  );
}

export interface MyTopTracksProps {
  limit: number;
  timeRange: UserTopTracksTimeRange;
}

export const MyTopTracks = ({ limit, timeRange }: MyTopTracksProps) => {
  const { data } = useUserTopTracks({ limit, time_range: timeRange, config: { suspense: true } });

  return <TrackCardList tracks={toTracksProps(data)} />;
};
