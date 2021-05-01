import { Flex, Grid, Image, Link as Anchor, Text } from '@chakra-ui/react';
import { LogoMIUrl } from 'assets';
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
        <Anchor cursor="pointer" display="flex" alignItems="center">
          <Image height="12" mr="4" src={LogoMIUrl} alt="Logo Muslim Illustrations" />
          <Text color="brand.cyan" fontWeight="bold">
            Muslim <br /> Illustrations
          </Text>
        </Anchor>
      </Link>
      <Grid gridTemplateColumns="repeat(2, auto)" gap="12">
        <Link href="/illustrations">
          <Anchor
            data-testid="illustrations-link"
            color={asPath === '/illustrations' ? 'brand.cyan' : 'brand.cyanDark'}
            cursor="pointer"
            _hover={{ color: 'brand.cyan' }}
            fontWeight="700"
          >
            Illustrations
          </Anchor>
        </Link>
        <Link href="/search">
          <Anchor
            color={asPath === '/search' ? 'brand.cyan' : 'brand.cyanDark'}
            cursor="pointer"
            _hover={{ color: 'brand.cyan' }}
            fontWeight="700"
          >
            Search
          </Anchor>
        </Link>
      </Grid>
    </Flex>
  );
};

export default Navbar;
