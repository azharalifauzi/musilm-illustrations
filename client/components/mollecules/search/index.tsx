import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { IcSearch } from 'assets/icons';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

export type SearchSuggestion = {
  query: string;
  onClick?: (query: string) => void;
};

interface SearchProps {
  suggestions?: SearchSuggestion[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onEnter?: (value: string) => void;
  isLoading?: boolean;
}

const Search: React.FC<SearchProps> = ({
  suggestions = [],
  value,
  onChange,
  placeholder,
  onEnter,
  isLoading,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const parentRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickAway(parentRef, () => {
    setIsFocused(false);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocused(false);
        inputRef.current.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFocused) {
        if (e.key === 'ArrowDown' && highlighted < suggestions.length - 1) {
          setHighlighted((prevState) => prevState + 1);
        } else if (e.key === 'ArrowUp' && highlighted > 0) {
          setHighlighted((prevState) => prevState - 1);
        } else if (e.key === 'ArrowUp' && highlighted === 0) {
          setHighlighted(-1);
          inputRef.current.focus();
          setTimeout(() => {
            inputRef.current.setSelectionRange(value?.length, value?.length);
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, highlighted, suggestions.length, value?.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsFocused(false);
        // inputRef.current.blur();
        if (highlighted >= 0 && suggestions[highlighted] && onEnter)
          onEnter(suggestions[highlighted].query);
        setHighlighted(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter, highlighted, suggestions]);

  return (
    <Box ref={parentRef} position="relative">
      <InputGroup color="brand.cyanDark">
        <InputLeftElement pointerEvents="none">
          <IcSearch />
        </InputLeftElement>
        <Input
          ref={inputRef}
          onFocus={() => {
            setIsFocused(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' && highlighted >= 0) {
              e.preventDefault();
            }
          }}
          role="textbox"
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e);
            if (!isFocused) setIsFocused(true);
          }}
          placeholder={placeholder}
        />
        <InputRightElement>
          {isLoading && <Spinner color="brand.cyan" size="sm" />}
        </InputRightElement>
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
            suggestions?.map(({ query, onClick }, i) => (
              <Box
                userSelect="none"
                as="li"
                key={query}
                background={highlighted == i && 'brand.cyan'}
                color={highlighted == i && 'white'}
                px="3"
                py="2"
                tabIndex={0}
                onClick={() => {
                  if (onClick) {
                    onClick(query);
                  }
                  setIsFocused(false);
                  inputRef.current.blur();
                }}
                onFocus={() => {
                  setHighlighted(i);
                }}
                onMouseOver={() => {
                  setHighlighted(i);
                }}
                aria-selected={highlighted === i ? 'true' : undefined}
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
