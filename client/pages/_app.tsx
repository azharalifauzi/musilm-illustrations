import '../styles/globals.css';
import { ChakraProvider, extendTheme, ChakraTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import clsx from 'clsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import * as gtag from 'utils/gtag';
import { useEffect } from 'react';

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
      green: '#35D345',
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

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Muslim Illustrations - Open Source Illustrations of Muslim Character</title>
        <meta
          name="description"
          content="Muslim Illustration provides you with free-to-use muslim themed illustrations for personal and commercial uses. You don’t even need to include our awesome authors’ name in your project."
        />
        <meta
          property="og:title"
          content="Muslim Illustrations - Open Source Illustrations of Muslim Character"
        />
        <meta
          property="og:description"
          content="Muslim Illustration provides you with free-to-use muslim themed illustrations for personal and commercial uses. You don’t even need to include our awesome authors’ name in your project."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://muslimillustrations.co/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@MuslimIllustrat" />
        <meta
          name="twitter:title"
          content="Muslim Illustrations - Open Source Illustrations of Muslim Character"
        />
        <meta
          name="twitter:description"
          content="Muslim Illustration provides you with free-to-use muslim themed illustrations for personal and commercial uses. You don’t even need to include our awesome authors’ name in your project."
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
