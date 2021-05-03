import { Button } from '@chakra-ui/button';
import { Box, Container, Grid, Text } from '@chakra-ui/layout';
import { ILLicense } from 'assets';
import { IllustrationCard, Layout, Search } from 'components';
import { useState } from 'react';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <Layout>
      <main>
        <Container maxW="1536px">
          <Grid
            onSubmit={(e) => e.preventDefault()}
            as="form"
            mt="20"
            maxW="800"
            mx="auto"
            templateColumns="1fr auto"
            gap="4"
          >
            <Search
              onEnter={(val) => setSearch(val)}
              suggestions={[
                { query: 'halo', onClick: (query) => setSearch(query) },
                { query: 'badnung', onClick: (query) => setSearch(query) },
                { query: 'damn', onClick: (query) => setSearch(query) },
              ]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Illustrations"
            />
            <Button type="submit">Search</Button>
          </Grid>
          <Grid mt="20" alignItems="center" templateColumns="1fr auto 1fr" gap="6">
            <Box w="100%" height="2px" background="brand.cyan" />
            <Text as="h1" fontSize="xl" color="brand.cyan" fontFamily="heading" fontWeight="700">
              Our top searches, just for you
            </Text>
            <Box w="100%" height="2px" background="brand.cyan" />
          </Grid>
          <Grid templateColumns="repeat(4, 1fr)" gap="9" mt="32">
            <IllustrationCard title="Halo">
              <ILLicense />
            </IllustrationCard>
            <IllustrationCard title="Hadj">
              <ILLicense />
            </IllustrationCard>
            <IllustrationCard title="Shalat">
              <ILLicense />
            </IllustrationCard>
            <IllustrationCard title="Shaum">
              <ILLicense />
            </IllustrationCard>
          </Grid>
        </Container>
      </main>
    </Layout>
  );
};

export default SearchPage;
