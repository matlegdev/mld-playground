import { UserTopTracksTimeRange } from '@mld/react-spotify-api';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { TitleSelect, TitleSelectOption } from '@mld/warthog/shared/ui';
import { Suspense, useState } from 'react';
import { MyTopTracks } from './MyTopTracks';

enum TimeRangeOptions {
  OneMonth,
  SixMonths,
  FourYears,
}

const limitOptions: TitleSelectOption<number>[] = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
];

const timeRangeOptions: TitleSelectOption<TimeRangeOptions>[] = [
  { label: 'month', value: TimeRangeOptions.OneMonth },
  { label: '6 months', value: TimeRangeOptions.SixMonths },
  { label: '4 years', value: TimeRangeOptions.FourYears },
];

const timeRangeMapping: Record<TimeRangeOptions, UserTopTracksTimeRange> = {
  [TimeRangeOptions.OneMonth]: 'short_term',
  [TimeRangeOptions.SixMonths]: 'medium_term',
  [TimeRangeOptions.FourYears]: 'long_term',
};

export const MyTopTracksPage = () => {
  const [limit, setLimit] = useState<number>(limitOptions[0].value as number);
  const [timeRange, setTimeRange] = useState<UserTopTracksTimeRange>('short_term');

  const onLimitChange = (limit: string) => {
    setLimit(+limit);
  };

  const onTimeRangeChange = (range: TimeRangeOptions) => {
    setTimeRange(timeRangeMapping[range]);
  };

  return (
    <VStack spacing={10}>
      <HStack w={'100%'}>
        <Heading as={'div'}>My top</Heading>
        <TitleSelect options={limitOptions} onChange={onLimitChange} />
        <Heading as={'div'}>tracks for the past</Heading>
        <TitleSelect options={timeRangeOptions} onChange={onTimeRangeChange} />
      </HStack>

      <Suspense fallback={<Box>Loading...</Box>}>
        <MyTopTracks limit={limit} timeRange={timeRange} />
      </Suspense>
    </VStack>
  );
};
