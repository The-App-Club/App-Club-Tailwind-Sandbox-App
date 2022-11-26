import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';
import {CssVarsProvider} from '@mui/joy/styles';
import {ChakraProvider} from '@chakra-ui/react';
import {customTheme} from '@/config/theme';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import '@/styles/index.css';
import '@/styles/index.scss';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const App = ({Component, pageProps}: AppProps) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <CssVarsProvider theme={customTheme}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </CssVarsProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
};

export default App;
