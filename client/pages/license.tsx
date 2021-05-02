import { Box, Container, Grid, GridItem, Text } from '@chakra-ui/layout';
import { IlAttachment, ILLicense } from 'assets';
import { Layout } from 'components';

const LicensePage = () => {
  return (
    <Layout>
      <main>
        <Container mt="20" maxW="1536">
          <Grid justifyItems="center" templateColumns="repeat(2, 1fr)">
            <Box>
              <Text
                mb="4"
                fontSize="35"
                fontWeight="700"
                color="brand.cyanDark"
                fontFamily="heading"
                as="h1"
              >
                Creative Commons License
              </Text>
              <Text color="brand.cyanDark">
                We’re using <strong>Creative Commons Zero (CC0)</strong> license for all of our
                illustrations. That means you can copy, modify, distribute and perform the work,
                even for commercial purposes, all without asking our permission. Yap, you read that
                right, a trully free-to-use illustrations for all of your projects’ needs.
              </Text>
            </Box>
            <Box color="brand.cyanDark">
              <ILLicense />
            </Box>
          </Grid>
          <Box>
            <Text
              mb="4"
              fontSize="35"
              fontWeight="700"
              color="brand.cyanDark"
              fontFamily="heading"
              as="h2"
            >
              A rule of thumb (tldr)
            </Text>
            <Text maxW="800" color="brand.cyanDark">
              If you are working on something and want to use illustrations to improve its
              appearance, modified or not, without the need for attribution or cost, you are good to
              go. If you find unDraw or its illustrations to be in the center of what you are doing
              (e.g. sell or re-distribute one/some of them, add them in an app), then you probably
              should not proceed.
            </Text>
          </Box>
          <Grid color="brand.cyanDark" my="20" templateColumns="repeat(3, 1fr)">
            <GridItem colSpan={1}>
              <IlAttachment />
            </GridItem>
            <GridItem colSpan={2}>
              <Text mb="4" fontSize="35" fontWeight="700" fontFamily="heading" as="h2">
                Full license text
              </Text>
              <Text as="h3" mb="4" fontSize="20">
                Copyright 2021 • Muslim Illustration
              </Text>
              <Text>
                All images, assets and vectors published on unDraw can be used for free. You can use
                them for noncommercial and commercial purposes. You do not need to ask permission
                from or provide credit to the creator or unDraw.
                <br />
                <br />
                More precisely, unDraw grants you an nonexclusive, worldwide copyright license to
                download, copy, modify, distribute, perform, and use the assets provided from unDraw
                for free, including for commercial purposes, without permission from or attributing
                the creator or unDraw. This license does not include the right to compile assets,
                vectors or images from unDraw to replicate a similar or competing service, in any
                form or distribute the assets in packs or otherwise. This extends to automated and
                non-automated ways to link, embed, scrape, search or download the assets included on
                the website without our consent.
              </Text>
              <Text as="h3" my="4" fontSize="20">
                Regarding brand logos that are included:
              </Text>
              <Text>
                Are registered trademarks of their respected owners. Are included on a promotional
                basis and do not represent an association with unDraw or its users. Do not indicate
                any kind of endorsement of the trademark holder towards unDraw, nor vice versa. Are
                provided with the sole purpose to represent the actual brand/service/company that
                has registered the trademark and must not be used otherwise.
              </Text>
            </GridItem>
          </Grid>
        </Container>
      </main>
    </Layout>
  );
};

export default LicensePage;
