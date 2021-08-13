import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../themes/dark-theme';

export function App() {
  return <ChakraProvider theme={theme}>Warthog</ChakraProvider>;
}

export default App;
