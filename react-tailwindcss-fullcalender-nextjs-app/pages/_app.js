import {css} from '@emotion/css';
import {CacheProvider} from '@emotion/react';
import {cache} from '@emotion/css';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {RecoilRoot, useRecoilState, useRecoilValue} from 'recoil';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';

import themeState from '@/stores/themeStore';

import '@fontsource/inter';
import '@/styles/index.css';
import '@/styles/index.scss';
import hamburgerState from '@/stores/hamburgerStore';

const CowboyBebopInit = ({children}) => {
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);
  const {mode} = useRecoilValue(themeState);
  const router = useRouter();

  const handleRouteChangeStart = useCallback(
    (e) => {
      setHamburger((prevState) => {
        return {
          opened: false,
          isTrigger: prevState.isTrigger,
        };
      });
    },
    [setHamburger]
  );

  useEffect(() => {
    if (mode === `dark`) {
      const html = document.documentElement;
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      const html = document.documentElement;
      html.classList.remove('dark');
      html.classList.add('light');
    }
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [mode, router, handleRouteChangeStart]);

  return <div className={`relative w-full`}>{children}</div>;
};

const CowboyBebop = ({Component, pageProps}) => {
  return (
    <RecoilRoot>
      <CacheProvider value={cache}>
        <CowboyBebopInit>
          <Meta />
          <Nav />
          <Header />
          <main className="min-h-screen">
            <article>
              <Component {...pageProps} />
            </article>
          </main>
          <Footer />
        </CowboyBebopInit>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default CowboyBebop;
