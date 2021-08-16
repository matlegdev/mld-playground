import { Container } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export const MainView: FunctionComponent = (props) => {
  return <Container maxW={'container.lg'}>{props.children}</Container>;
};
