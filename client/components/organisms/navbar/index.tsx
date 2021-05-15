import { Box, Flex, Grid, Slide, Text } from '@chakra-ui/react';
import { LogoMI } from 'assets';
import { IcMenu, IcSearch } from 'assets/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  const { asPath } = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  return (
    <Flex
      px={{ md: '12', base: '6' }}
      alignItems="center"
      justifyContent="space-between"
      as="header"
      height="20"
      background="white"
      position={{ md: 'relative', base: 'fixed' }}
      top={scrollDir === 'down' ? '-20' : '0'}
      left="0"
      w="100%"
      zIndex="100"
      transition="all .3s"
      shadow={{ md: 'none', base: scrollDir === 'up' ? 'lg' : 'none' }}
    >
      <Link href="/">
        <a>
          <Flex cursor="pointer" alignItems="center">
            <Box mr="3">
              <LogoMI height="56" data-testid="logo muslim illustrations" />
            </Box>
            <Text color="brand.cyan" fontWeight="bold">
              Muslim <br /> Illustrations
            </Text>
          </Flex>
        </a>
      </Link>
      <Box
        onClick={() => setShow(!show)}
        position="relative"
        w="12"
        h="12"
        display={{ md: 'none', base: 'flex' }}
        justifyContent="center"
        alignItems="center"
        _focus={{
          border: '1px dashed #26b6bd',
        }}
        as="button"
        zIndex="50"
      >
        <div
          className={clsx(styles.hamburger, {
            [styles.active]: show,
          })}
        />
      </Box>
      <Slide style={{ zIndex: 10 }} in={show} direction="right">
        <Box
          zIndex="10"
          position="absolute"
          right="0"
          top="0"
          w="264px"
          background="white"
          h="100%"
          display="flex"
          alignItems="center"
        >
          <Grid
            justifyItems="center"
            alignItems="center"
            gridTemplateRows="repeat(2, max-content)"
            gap="6"
            w="100%"
          >
            <Link href="/illustrations">
              <a>
                <Grid
                  data-testid="illustrations-link-mobile"
                  color={asPath === '/illustrations' ? 'brand.cyan' : 'brand.cyanDark'}
                  cursor="pointer"
                  _hover={{ color: 'brand.cyan' }}
                  fontWeight="700"
                  display="grid"
                  gridTemplateColumns="repeat(2, max-content)"
                  gap="2"
                  alignItems="center"
                >
                  <IcMenu />
                  <span>Illustrations</span>
                </Grid>
              </a>
            </Link>
            <Link href="/search">
              <a>
                <Grid
                  color={asPath === '/search' ? 'brand.cyan' : 'brand.cyanDark'}
                  cursor="pointer"
                  _hover={{ color: 'brand.cyan' }}
                  fontWeight="700"
                  gridTemplateColumns="repeat(2, max-content)"
                  gap="2"
                  alignItems="center"
                >
                  <IcSearch />
                  <span>Search</span>
                </Grid>
              </a>
            </Link>
          </Grid>
        </Box>
      </Slide>
      <Grid display={{ md: 'grid', base: 'none' }} gridTemplateColumns="repeat(2, auto)" gap="12">
        <Link href="/illustrations">
          <a>
            <Grid
              data-testid="illustrations-link"
              color={asPath === '/illustrations' ? 'brand.cyan' : 'brand.cyanDark'}
              cursor="pointer"
              _hover={{ color: 'brand.cyan' }}
              fontWeight="700"
              display="grid"
              gridTemplateColumns="repeat(2, max-content)"
              gap="2"
              alignItems="center"
            >
              <IcMenu />
              <span>Illustrations</span>
            </Grid>
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Grid
              color={asPath === '/search' ? 'brand.cyan' : 'brand.cyanDark'}
              cursor="pointer"
              _hover={{ color: 'brand.cyan' }}
              fontWeight="700"
              gridTemplateColumns="repeat(2, max-content)"
              gap="2"
              alignItems="center"
            >
              <IcSearch />
              <span>Search</span>
            </Grid>
          </a>
        </Link>
      </Grid>
    </Flex>
  );
};

export default Navbar;
