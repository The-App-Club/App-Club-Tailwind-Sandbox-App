import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {ScrollToTop} from './components/ScrollToTop';
import {Nav} from './components/Nav';

import {HomePage} from './pages/home';
import {AdsPage} from './pages/adsense';

import logo from './assets/logo.png';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';
import {Footer} from './components/Footer';
import {Header} from './components/Header';

const App = () => {
  const navigate = useNavigate();

  const outerContainerDomRef = useRef(null);
  const [tik, setTik] = useState(null);

  const navCloseNotifierWhenRouting = useCallback((e) => {
    setTik(new Date());
  }, []);

  const location = useLocation();

  return (
    <div
      ref={outerContainerDomRef}
      id="outer-container"
      className={css`
        position: absolute;
        width: 100%;
        /* https://zenn.dev/catnose99/articles/a873bbbe25b15b */
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100vh;
        &.nav-active {
          touch-action: none;
          overflow: hidden;
          height: 100%;
        }
      `}
    >
      <ScrollToTop />
      <Header tik={tik} outerContainerDomRef={outerContainerDomRef} />
      <main
        id="page-wrap"
        className={css`
          width: 100%;
          height: 100%;
        `}
      >
        <article>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <HomePage
                  pageName={location.pathname}
                  notifier={navCloseNotifierWhenRouting}
                />
              }
            />
            <Route
              path="/adsense"
              element={
                <AdsPage
                  pageName={location.pathname}
                  notifier={navCloseNotifierWhenRouting}
                />
              }
            />
          </Routes>
        </article>
      </main>
      <Footer />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
