import { Button } from '@chakra-ui/button';
import { Flex, Text, Box, Container, Grid } from '@chakra-ui/layout';
import { ILDummy, ILHero, LogoMI } from 'assets';
import { Layout } from 'components';
import Head from 'next/head';

const isComingSoon = true;

export default function Home() {
  return (
    <>
      <Head>
        <title>Muslim Illustrations | Coming Soon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isComingSoon ? (
          <ComingSoon />
        ) : (
          <Layout>
            <Box
              py="68px"
              position="relative"
              background="linear-gradient(260.56deg, #C7FCFF 6.29%, #1BA9B0 79.54%)"
              as="section"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-96px"
                right="-60px"
                background="brand.cyan"
                h="350px"
                w="350px"
                borderRadius="50%"
                zIndex="0"
                opacity="0.5"
              />
              <Box
                position="absolute"
                bottom="10"
                right="20px"
                background="brand.cyan"
                h="40px"
                w="40px"
                borderRadius="50%"
                zIndex="0"
                opacity="0.5"
              />
              <Container maxW="1536px">
                <Grid alignItems="center" templateColumns="repeat(2, 1fr)" gap="8">
                  <Box>
                    <Text
                      color="white"
                      fontSize="40px"
                      fontFamily="heading"
                      fontWeight="bold"
                      as="h1"
                      mb="6"
                    >
                      Muslim Illustration
                    </Text>
                    <Text mb="8" color="white">
                      Muslim Illustration provides you with free-to-use muslim themed illustrations
                      for personal and commercial uses. You don’t even need to include our awesome
                      authors’ name in your project.
                    </Text>
                    <Button fontSize="16px" size="lg" colorMode="white">
                      Browse our illustrations
                    </Button>
                  </Box>
                  <Box color="brand.cyan">
                    <ILHero />
                  </Box>
                </Grid>
              </Container>
            </Box>
          </Layout>
        )}
      </main>
    </>
  );
}

const ComingSoon: React.FC = () => {
  return (
    <Box mx="auto" maxW="container.xl" marginTop="6">
      <Flex justifyContent="center" alignItems="center">
        <Box marginRight="3">
          <LogoMI />
        </Box>
        <Text color="#0066FF" fontFamily="heading" fontWeight="bold">
          Muslim <br /> Illustrations
        </Text>
      </Flex>
      <Text
        mb="12"
        mt="24"
        fontWeight="bold"
        fontSize={{ md: '5xl', base: '4xl' }}
        textAlign="center"
        color="brand.cyan"
      >
        COMING SOON
      </Text>
      <Flex p="4" justifyContent="center">
        <ILDummy />
      </Flex>
    </Box>
  );
};
