import { Button } from '@chakra-ui/button';
import { Box, Container, Flex, Grid, Text } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { IlComingSoon, IlFiles, ILHero, ILLicense, LogoMI } from 'assets';
import { Layout } from 'components';
import ColorPicker from 'components/organisms/color-picker';
import { useDelay } from 'hooks';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { ColorResult } from 'react-color';
import { InView } from 'react-intersection-observer';
import { useWindowSize } from 'react-use';

const isComingSoon = false;

export default function Home() {
  const [color, setColor] = useState<string>('#26B6BD');

  const { delays } = useDelay([0, 200, 200, 300, 300, 300, 300]);
  const { height } = useWindowSize(undefined, 900);

  const handleChangeColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <>
      <Head>
        <title>Muslim Illustrations | Coming Soon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isComingSoon ? (
        <ComingSoon height={height} />
      ) : (
        <Layout>
          <main>
            <Box
              py="120px"
              position="relative"
              background="linear-gradient(260.56deg, #C7FCFF 6.29%, #1BA9B0 79.54%)"
              as="section"
              overflow="hidden"
              px={{ base: '6', md: '10' }}
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
                <Grid
                  justifyItems="center"
                  alignItems="center"
                  templateColumns={{ md: 'repeat(2, 1fr)', base: '1fr' }}
                  gap="8"
                >
                  <Box textAlign={{ base: 'center', md: 'left' }}>
                    <SlideFade offsetY="20" in={delays[0]}>
                      <Text
                        color="white"
                        fontSize="5xl"
                        fontFamily="heading"
                        fontWeight="bold"
                        as="h1"
                        mb="6"
                      >
                        Muslim Illustration
                      </Text>
                    </SlideFade>
                    <SlideFade offsetY="20" in={delays[1]}>
                      <Text maxW="512px" mb="8" color="white">
                        Muslim Illustration provides you with free-to-use muslim themed
                        illustrations for personal and commercial uses. You don’t even need to
                        include our awesome authors’ name in your project.
                      </Text>
                    </SlideFade>
                    <SlideFade offsetY="20" in={delays[2]}>
                      <Link href="/illustrations">
                        <a>
                          <Button fontSize="16px" size="lg" colormode="white">
                            Browse our illustrations
                          </Button>
                        </a>
                      </Link>
                    </SlideFade>
                  </Box>
                  <Box
                    w="100%"
                    maxW="476"
                    gridRowStart={{ base: 1, md: 'auto' }}
                    justifySelf="center"
                    color={color}
                    position="relative"
                  >
                    <SlideFade in={delays[3]}>
                      <ILHero height="100%" width="100%" />
                    </SlideFade>
                  </Box>
                </Grid>
              </Container>
            </Box>
            <Container
              as="section"
              px={{ base: '6', md: '10' }}
              py={{ base: '8', md: '20' }}
              maxW="1536px"
            >
              <Grid
                justifyItems="center"
                alignItems="center"
                templateColumns={{ md: 'repeat(2, 1fr)', base: '1fr' }}
                gap="8"
              >
                <SlideFade in={delays[4]}>
                  <Box textAlign={{ base: 'center', md: 'left' }}>
                    <Text
                      color="brand.cyanDark"
                      fontSize="4xl"
                      fontFamily="heading"
                      fontWeight="bold"
                      as="h2"
                      mb="6"
                    >
                      Creative Commons License
                    </Text>
                    <Box my="8" display={{ base: 'block', md: 'none' }} color={color}>
                      <SlideFade style={{ maxWidth: 400, margin: '0 auto' }} in={delays[5]}>
                        <ILLicense width="100%" height="100%" />
                      </SlideFade>
                    </Box>
                    <Text maxW="512px" mb="8" color="brand.cyanDark">
                      We’re using <strong>Creative Commons Zero (CC0)</strong> license for all of
                      our illustrations. That means you can copy, modify, distribute and perform the
                      work, even for commercial purposes, all without asking our permission. Yap,
                      you read that right, a trully free-to-use illustrations for all of your
                      projects’ needs.
                    </Text>
                    <Link href="/license">
                      <a>
                        <Button fontSize="16px" variant="outlined">
                          Read More
                        </Button>
                      </a>
                    </Link>
                  </Box>
                </SlideFade>
                <Box display={{ base: 'none', md: 'block' }} justifySelf="center" color={color}>
                  <SlideFade in={delays[5]}>
                    <ILLicense />
                  </SlideFade>
                </Box>
              </Grid>
            </Container>
            <Container
              as="section"
              px={{ base: '6', md: '10' }}
              py={{ base: '8', md: '20' }}
              maxW="1536px"
            >
              <Grid
                alignItems="center"
                templateColumns={{ md: 'repeat(2, 1fr)', base: '1fr' }}
                gap="8"
              >
                <Box
                  display={{ base: 'none', md: 'block' }}
                  justifySelf="center"
                  color="brand.cyan"
                >
                  <InView triggerOnce threshold={1}>
                    {({ inView, ref }) => (
                      <SlideFade
                        ref={ref}
                        offsetY="30"
                        style={{ transitionDuration: '0.2s' }}
                        in={inView}
                      >
                        <ColorPicker color={color} onChange={handleChangeColor} />
                      </SlideFade>
                    )}
                  </InView>
                </Box>
                <InView triggerOnce threshold={0.25}>
                  {({ inView, ref }) => (
                    <SlideFade
                      offsetY="30"
                      style={{ transitionDuration: '0.2s', transitionDelay: '0.3s' }}
                      in={inView}
                      ref={ref}
                    >
                      <Box textAlign={{ md: 'left', base: 'center' }}>
                        <Text
                          color="brand.cyanDark"
                          fontSize="4xl"
                          fontFamily="heading"
                          fontWeight="bold"
                          as="h2"
                          mb="6"
                        >
                          Edit Color On The Fly
                        </Text>
                        <Box
                          display={{ base: 'block', md: 'none' }}
                          justifySelf="center"
                          color="brand.cyan"
                          my="8"
                          position="relative"
                        >
                          <ColorPicker color={color} onChange={handleChangeColor} />
                        </Box>
                        <Text maxW="512px" mb="8" color="brand.cyanDark">
                          Have you ever had a problem where an illustration you saw was too good to
                          miss out, yet the color didn’t suit your taste? Well, worry no more...!
                          With our Color Picker feature, you can change the color of each of our
                          illustration to suit your exact taste. Sounds awesome? Well, it is...
                        </Text>
                      </Box>
                    </SlideFade>
                  )}
                </InView>
              </Grid>
            </Container>
            <Container
              as="section"
              px={{ base: '6', md: '10' }}
              py={{ base: '8', md: '20' }}
              maxW="1536px"
            >
              <InView triggerOnce threshold={0.25}>
                {({ inView, ref }) => (
                  <SlideFade offsetY={20} style={{ transitionDuration: '0.3s' }} in={inView}>
                    <Grid
                      ref={ref}
                      justifyItems="center"
                      alignItems="center"
                      templateColumns={{ md: 'repeat(2, 1fr)', base: '1fr' }}
                      gap="8"
                    >
                      <Box textAlign={{ md: 'left', base: 'center' }}>
                        <Text
                          color="brand.cyanDark"
                          fontSize="4xl"
                          fontFamily="heading"
                          fontWeight="bold"
                          as="h2"
                          mb="6"
                        >
                          One File, Use Everywhere
                        </Text>
                        <Box
                          display={{ md: 'none', base: 'block' }}
                          justifySelf="center"
                          color={color}
                          my="8"
                        >
                          <IlFiles width="100%" height="100%" />
                        </Box>
                        <Text maxW="512px" mb="8" color="brand.cyanDark">
                          Download our SVG illustrations and use them on every project without
                          worrying about file compatibility. Do you know that you can scale SVG
                          illustrations without the need of worrying about losing any quaility? SVG
                          is awesome I tell ya...!
                        </Text>
                      </Box>
                      <Box
                        display={{ md: 'block', base: 'none' }}
                        justifySelf="center"
                        color={color}
                      >
                        <IlFiles />
                      </Box>
                    </Grid>
                  </SlideFade>
                )}
              </InView>
            </Container>
          </main>
          <Box textAlign="center" py="8" background="#F9F9F9" color="brand.cyanDark" as="footer">
            © Copyright 2021 Muslim Illustration
          </Box>
        </Layout>
      )}
    </>
  );
}

const ComingSoon: React.FC<{ height: number }> = ({ height }) => {
  return (
    <Box>
      <Flex h={100} justifyContent="center" alignItems="center">
        <Box marginRight="3">
          <LogoMI />
        </Box>
        <Text color="brand.cyanBlue" fontFamily="heading" fontWeight="bold">
          Muslim <br /> Illustrations
        </Text>
      </Flex>
      <Flex flexDir="column" h={height - 100} justifyContent="center">
        <Text
          mt={-100}
          fontWeight="bold"
          fontSize={{ md: '5xl', base: '4xl' }}
          textAlign="center"
          color="brand.cyan"
          mb="10"
        >
          COMING SOON
        </Text>
        <Flex p={{ md: 4, base: 6 }} justifyContent="center">
          <IlComingSoon width="640" />
        </Flex>
      </Flex>
    </Box>
  );
};
