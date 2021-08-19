import { Image, Text, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { TextProps } from '@chakra-ui/layout';

export interface TrackCardProps {
  imgUrl: string;
  trackName: string;
  artistName: string;
}

const TextWithOverflow = (props: { label: string } & TextProps) => {
  const { label, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflown, setIsOverflown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element == null) {
      setIsOverflown(false);
      return;
    }

    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, []);

  return (
    <Tooltip label={label} isDisabled={!isOverflown}>
      <Text maxW={'100%'} isTruncated ref={ref as never} {...rest}>
        {label}
      </Text>
    </Tooltip>
  );
};

export const TrackCard = (props: TrackCardProps) => {
  const { imgUrl, trackName, artistName } = props;

  return (
    <VStack
      bg={useColorModeValue('gray.200', 'gray.700')}
      borderRadius={'lg'}
      padding={4}
      overflow={'hidden'}
      align={'start'}
      spacing={3}
    >
      <Image src={imgUrl} loading={'lazy'} borderRadius={'xl'} />

      <TextWithOverflow as={'div'} label={trackName} fontWeight={'bold'} />
      <TextWithOverflow as={'div'} style={{ marginTop: 0 }} label={artistName} fontSize={'sm'} />
    </VStack>
  );
};
