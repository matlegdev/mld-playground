import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { MainView } from './MainView';

export const Layout: FunctionComponent = (props) => {
  return (
    <>
      <Header />
      {/** the hard-coded 53 is the footer height */}
      <Box as="main" pt={24} pb={8} minH={'calc(100vh - 53px)'}>
        <MainView>{props.children}</MainView>
      </Box>
      <Footer />
    </>
  );
};
