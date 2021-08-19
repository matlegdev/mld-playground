import { Box, HStack, Select, Text, useColorModeValue, useStyleConfig, VisuallyHidden } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

export interface TitleSelectOption<T> {
  label: string;
  value: string | number;
}

export interface TitleSelectProps<T> {
  options: TitleSelectOption<T>[];
  defaultValue?: string | number;
  onChange: (value: T) => void;
}

export const TitleSelect = <T,>(props: TitleSelectProps<T>) => {
  const { options, defaultValue, onChange } = props;
  const styles = useStyleConfig('Heading');

  const onSelectChange = (x: SyntheticEvent<HTMLSelectElement>) => {
    const value = x.currentTarget.value as unknown as T;
    onChange(value);
  };

  return (
    <HStack>
      <Box
        as={Select}
        __css={styles}
        variant={'unstyled'}
        pr={0}
        paddingInlineEnd={0}
        color={useColorModeValue('green.500', 'green.300')}
        textDecor={'underline'}
        icon={<VisuallyHidden />}
        defaultValue={defaultValue}
        /* casted as never to please typescript ; the underlying Select properties are not properly inferred */
        onChange={onSelectChange as never}
      >
        {(options ?? []).map(({ label, value }, index) => (
          <Text key={index} as={'option'} value={value} fontSize={'md'}>
            {label}
          </Text>
        ))}
      </Box>
    </HStack>
  );
};
