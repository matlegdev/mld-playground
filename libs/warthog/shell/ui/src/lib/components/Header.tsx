import { Box, Container, HStack, IconButton, Link, Text, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { GithubIcon, ThemeToggle } from '@mld/react-chakra-ui';

const Logo = styled(Link)`
  font-weight: bold;
  user-select: none;
  :hover,
  [data-hover] {
    text-decoration: none;
  }
`;

export const Header = () => {
  return (
    <Box bg={useColorModeValue('white', 'gray.800')} w={'100%'} position={'fixed'} zIndex={100} boxShadow={'base'}>
      <Container maxW={'container.lg'}>
        <VStack align={'start'}>
          <HStack w={'100%'} justify={'space-between'} h={16}>
            <Logo href={'/'}>
              <Text>Warthog</Text>
            </Logo>

            <HStack>
              <Link href={'https://github.com/matlegdev/mld-playground'} isExternal>
                <Tooltip label={'Source code'}>
                  <IconButton aria-label={'Go to MLD Github'} icon={<GithubIcon />} />
                </Tooltip>
              </Link>

              <ThemeToggle />
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
