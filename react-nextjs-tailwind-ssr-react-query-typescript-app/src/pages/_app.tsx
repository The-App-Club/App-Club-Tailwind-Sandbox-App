import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/libs/queryClient';

import '@/styles/index.css';
import '@/styles/index.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={customTheme}>
          <Component {...pageProps} />
        </CssVarsProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
