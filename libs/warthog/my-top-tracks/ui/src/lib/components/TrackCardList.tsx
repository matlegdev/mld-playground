import { ScaleFade, SimpleGrid } from '@chakra-ui/react';
import { TrackCard, TrackCardProps } from './TrackCard';

export interface TrackCardListProps {
  columns?: number;
  spacing?: number;
  initialScale?: number;
  tracks: TrackCardProps[];
}

export const TrackCardList = (props: TrackCardListProps) => {
  const { columns, tracks, spacing, initialScale } = props;

  return (
    <SimpleGrid columns={columns ?? 5} spacing={spacing ?? 5}>
      {tracks.map((track, index) => (
        <ScaleFade in key={index}>
          <TrackCard {...track} />
        </ScaleFade>
      ))}
    </SimpleGrid>
  );
};
