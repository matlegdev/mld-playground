import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './themes/dark-theme';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
