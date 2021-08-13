import { extendTheme } from '@chakra-ui/react';
import { Theme } from '@chakra-ui/theme';

export const theme = extendTheme<Theme>({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
