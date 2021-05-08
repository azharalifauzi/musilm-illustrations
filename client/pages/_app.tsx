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
      cyanBlue: '#06A0A8',
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
        colormode: 'cyan',
        variants: 'solid',
      },
      variants: {
        outlined: (props) => ({
          background: 'transparent',
          border: '1px solid',
          borderColor:
            clsx({
              'brand.cyan': props.colormode === 'cyan',
            }) || 'brand.cyan',
          color:
            clsx({
              'brand.cyan': props.colormode === 'cyan',
            }) || 'brand.cyan',
          _hover: {
            background: 'brand.cyan',
            color: 'white',
          },
        }),
        solid: (props) => ({
          background:
            clsx({
              'brand.cyan': props.colormode === 'cyan',
              white: props.colormode === 'white',
              'brand.green': props.colormode === 'green',
              'brand.cyanDark': props.colormode === 'cyanDark',
            }) || 'brand.cyan',
          transform: 'scale(1)',
          transition: 'all .3s',
          color:
            clsx({
              'brand.cyan': props.colormode === 'white',
              white:
                props.colormode === 'cyan' ||
                props.colormode === 'green' ||
                props.colormode === 'cyanDark',
            }) || 'brand.cyan',
          _hover: {
            background: '',
            transform: 'scale(1.025)',
          },
          _active: {
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
