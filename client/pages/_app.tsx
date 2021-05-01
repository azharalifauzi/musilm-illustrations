import '../styles/globals.css';
import { ChakraProvider, extendTheme, ChakraTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import clsx from 'clsx';

const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
});

const theme = extendTheme<ChakraTheme>({
  breakpoints,
  fonts: {
    heading: "'Montserrat Alternates', sans-serif",
    body: "'Nunito', sans-serif",
  },
  colors: {
    brand: {
      cyan: '#26B6BD',
      cyanDark: '#60888A',
      green: '#6AF078',
      darkGrey: '#A0A0A0',
      softGrey: '#D5D5D5',
    },
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Button: {
      defaultProps: {
        colorMode: 'cyan',
        variants: 'solid',
      },
      variants: {
        outlined: (props) => ({
          background: 'transparent',
          border: '1px solid',
          borderColor:
            clsx({
              'brand.cyan': props.colorMode === 'cyan',
            }) ?? 'brand.cyan',
        }),
        solid: (props) => ({
          background:
            clsx({
              'brand.cyan': props.colorMode === 'cyan',
              white: props.colorMode === 'white',
              'brand.green': props.colorMode === 'green',
            }) ?? 'brand.cyan',
          color:
            clsx({
              'brand.cyan': props.colorMode === 'white',
              white: props.colorMode === 'cyan' || props.colorMode === 'green',
            }) ?? 'white',
          _hover: {
            background: '',
          },
        }),
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
