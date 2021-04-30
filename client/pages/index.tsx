import { Box } from '@chakra-ui/layout';
import { Flex, Text, Container } from '@chakra-ui/layout';
import { ILDummy, LogoMI } from 'assets';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Muslim Illustrations | Coming Soon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxW="container.xl" marginTop="6">
          <Flex justifyContent="center" alignItems="center">
            <Box marginRight="3">
              <LogoMI />
            </Box>
            <Text fontWeight="bold">Muslim Illustrations</Text>
          </Flex>
          <Text
            mb="12"
            mt="24"
            fontWeight="bold"
            fontSize={{ md: '6xl', base: '4xl' }}
            textAlign="center"
          >
            COMING SOON
          </Text>
          <Flex p="4" justifyContent="center">
            <ILDummy />
          </Flex>
        </Container>
      </main>
    </>
  );
}
