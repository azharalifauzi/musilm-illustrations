import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { IcSearch } from 'assets/icons';
import { useState } from 'react';

interface SearchProps {
  suggestions?: { query: string; onClick?: () => void }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ suggestions = [], value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Box position="relative">
      <InputGroup color="brand.cyanDark">
        <InputLeftElement pointerEvents="none">
          <IcSearch />
        </InputLeftElement>
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="textbox"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </InputGroup>
      {isFocused && value?.length > 0 && (
        <Box
          as="ul"
          w="100%"
          position="absolute"
          top="12"
          background="white"
          boxShadow="lg"
          borderRadius="lg"
          left="0"
          py="3"
          zIndex="50"
          border="1px solid"
          borderColor="brand.cyanDark"
          color="brand.cyanDark"
          listStyleType="none"
        >
          {suggestions?.length > 0 ? (
            suggestions?.map(({ query, onClick }) => (
              <Box
                userSelect="none"
                _hover={{
                  background: 'brand.cyan',
                  color: 'white',
                }}
                as="li"
                px="3"
                py="2"
                key={query}
                onClick={onClick}
              >
                {query}
              </Box>
            ))
          ) : (
            <Box px="3" as="li">
              no suggestion show up, just search it anyway :)
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Search;
