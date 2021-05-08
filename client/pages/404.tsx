import { Button } from '@chakra-ui/button';
import { Container, Flex, Text } from '@chakra-ui/layout';
import { ILDummy } from 'assets';
import { Layout } from 'components';
import { useWindowSize } from 'react-use';
import Link from 'next/link';

const NotFoundPage = () => {
  const { height } = useWindowSize();
  return (
    <Layout>
      <main>
        <Container
          h={height - 80}
          display="flex"
          flexDir="column"
          justifyContent="center"
          maxW="1536"
        >
          <Text
            as="h1"
            color="brand.cyan"
            fontWeight="700"
            fontFamily="heading"
            fontSize="60"
            textAlign="center"
            mb="3"
          >
            404
          </Text>
          <Text
            fontSize="20"
            color="brand.cyan"
            fontWeight="700"
            fontFamily="heading"
            textAlign="center"
          >
            Sorry, but we can’t find the page...
          </Text>
          <Flex my="20" justifyContent="center">
            <ILDummy />
          </Flex>
          <Flex justifyContent="center">
            <Link href="/">
              <a>
                <Button>Back to Home</Button>
              </a>
            </Link>
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
