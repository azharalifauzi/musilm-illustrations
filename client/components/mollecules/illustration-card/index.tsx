import { Box, Text, Flex, AspectRatio } from '@chakra-ui/layout';

interface IllustrationCardProps {
  onClick?: () => void;
  title?: string;
}

const IllustrationCard: React.FC<IllustrationCardProps> = ({ children, onClick, title }) => {
  return (
    <AspectRatio ratio={1} maxW="100%">
      <Box
        cursor="pointer"
        w="100%"
        h="100%"
        position="relative"
        onClick={onClick}
        data-testid="card"
        border="1px solid"
        borderColor="brand.cyanDark"
        borderRadius="lg"
        role="group"
        overflow="visible !important"
        as="button"
        _hover={{
          borderColor: 'brand.cyan',
        }}
      >
        <Flex
          transition="all .3s"
          _groupHover={{
            transform: 'scale(1.05)',
          }}
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          px="8"
          color="brand.cyan"
        >
          {children}
        </Flex>
        <Box
          background="white"
          px="5"
          maxW="100%"
          w="max-content"
          mx="auto"
          position="absolute"
          zIndex="10"
          transform="translateY(50%)"
          bottom="0"
          borderRadius="lg"
          border="1px solid"
          borderColor="brand.cyanDark"
          _groupHover={{
            borderColor: 'brand.cyan',
          }}
          py="6px"
        >
          <Text
            fontFamily="heading"
            fontWeight="medium"
            _groupHover={{ color: 'brand.cyan' }}
            color="brand.cyanDark"
          >
            {title}
          </Text>
        </Box>
      </Box>
    </AspectRatio>
  );
};

export default IllustrationCard;
