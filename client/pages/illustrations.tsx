import { Box, Container, Flex, Grid, Text } from '@chakra-ui/layout';
import { ILLicense } from 'assets';
import { IllustrationCard, IllustrationDetail, Layout } from 'components';
import Router, { useRouter } from 'next/router';
import { SelectSearchProps } from 'react-select-search';
import SelectSearch, { fuzzySearch } from 'react-select-search/dist/cjs';

const IllustrationsPage = () => {
  const { query } = useRouter();

  return (
    <>
      <IllustrationDetail
        isOpen={Boolean(query['open-detail'])}
        onClose={() => Router.replace({ query: {} })}
        title="halo"
        author="halo"
      >
        <ILLicense />
      </IllustrationDetail>
      <Layout>
        <main>
          <Container maxW="1536px">
            <Grid mt="20" mb="5" alignItems="center" templateColumns="1fr auto 1fr" gap="6">
              <Box w="100%" height="2px" background="brand.cyan" />
              <Text as="h1" fontSize="20" color="brand.cyan" fontFamily="heading" fontWeight="700">
                Free Illustration, for every project you’d need
              </Text>
              <Box w="100%" height="2px" background="brand.cyan" />
            </Grid>
            <Text mb="20" maxW="800" mx="auto" textAlign="center">
              Muslim Illustration provides you with free-to-use muslim themed illustrations for
              personal and commercial uses. You don’t even need to include our awesome authors’ name
              in your project, but still we’d be grateful if you do that though.
            </Text>
            <Flex justifyContent="flex-end">
              <DropdownSearch
                options={[
                  { name: 'Halo yang lin', value: 'yang lain' },
                  { name: 'Halo', value: 'damng' },
                  { name: 'Halo Makan', value: 'damng1' },
                ]}
                placeholder="Search by category"
              />
            </Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap="9" mt="16">
              <IllustrationCard
                onClick={() => Router.push({ query: { 'open-detail': 'halo' } })}
                title="Halo"
              >
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
    </>
  );
};

export default IllustrationsPage;

const DropdownSearch: React.FC<SelectSearchProps> = (props) => (
  <SelectSearch search filterOptions={fuzzySearch} {...props} />
);
