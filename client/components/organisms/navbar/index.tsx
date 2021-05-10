import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { LogoMI } from 'assets';
import { IcMenu, IcSearch } from 'assets/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { asPath } = useRouter();

  return (
    <Flex
      px={{ md: '12', base: '6' }}
      alignItems="center"
      justifyContent="space-between"
      as="header"
      height="20"
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
      <Grid gridTemplateColumns="repeat(2, auto)" gap="12">
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
