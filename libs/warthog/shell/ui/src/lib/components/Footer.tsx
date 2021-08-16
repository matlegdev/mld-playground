import { Container, HStack, Text, useColorModeValue } from '@chakra-ui/react';

const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <Container maxW={'container.lg'}>
      <HStack py={4}>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
          © {date} Mathieu Legras
        </Text>
      </HStack>
    </Container>
  );
};
