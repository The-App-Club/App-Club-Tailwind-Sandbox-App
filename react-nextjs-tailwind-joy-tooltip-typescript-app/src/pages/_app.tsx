import type {AppProps} from 'next/app';
import {CssVarsProvider} from '@mui/joy/styles';
import {ChakraProvider} from '@chakra-ui/react';
import {customTheme} from '@/config/theme';

import '@/styles/index.css';
import '@/styles/index.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </CssVarsProvider>
  );
};

export default App;
