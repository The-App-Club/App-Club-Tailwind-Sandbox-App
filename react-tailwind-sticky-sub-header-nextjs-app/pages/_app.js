import {cache,css} from '@emotion/css';
import {CacheProvider} from '@emotion/react';
import {useRouter} from 'next/router';
import {useCallback, useEffect} from 'react';
import {RecoilRoot, useRecoilState, useRecoilValue} from 'recoil';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Meta from '@/components/Meta';

import '@fontsource/inter';
import '@/styles/index.css';
import '@/styles/index.scss';
import '@/styles/datepicker.css';

import {routes} from '@/config/route';
import {useSmoothScroll} from '@/hooks/useSmoothScroll';
import hamburgerState from '@/stores/hamburgerStore';
import sidebarState from '@/stores/sidebarStore';
import themeState from '@/stores/themeStore';

const CowboyBebopInit = ({children, router: r}) => {
  useSmoothScroll();
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);
  const {mode} = useRecoilValue(themeState);
  const router = useRouter();

  useEffect(() => {
    const getMatchedRoute = ({pathName}) => {
      return routes.find((route) => {
        return route.pathName === pathName;
      });
    };
    const {activeMenuName} = getMatchedRoute({pathName: r.pathname});
    setSidebar((prevState) => {
      return {
        activeMenuName,
      };
    });
  }, [r, setSidebar]);

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
  const router = useRouter();
  return (
    <RecoilRoot>
      <CacheProvider value={cache}>
        <CowboyBebopInit router={router}>
          <Meta />
          <Header {...router} />
          <main
            className={css`
              position: relative;
              max-width: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              display: grid;
              grid-template-rows: 1fr auto;
              grid-template-columns: 100%;
              min-height: 100vh;
            `}
          >
            <article>
              <Component {...pageProps} />
            </article>
          </main>
          <Footer {...router} />
        </CowboyBebopInit>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default CowboyBebop;
