import type {AppProps} from 'next/app';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';

import '@/styles/index.css';
import '@/styles/index.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
};

export default App;
