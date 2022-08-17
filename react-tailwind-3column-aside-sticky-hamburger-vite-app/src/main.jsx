import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {Nav} from './components/Nav';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {HomePage} from './pages/home';
import {AdsPage} from './pages/adsense';
import {TagPage} from './pages/tag';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';

const App = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);

  const handleClick = (e) => {
    setOpen((prevOpen) => {
      return !prevOpen;
    });
    setIsTrigger(true);
  };
  return (
    <div
      className={css`
        width: 100%;
        /* https://zenn.dev/catnose99/articles/a873bbbe25b15b */
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 100%;
        min-height: 100vh;
      `}
    >
      <Nav
        open={open}
        setOpen={setOpen}
        isTrigger={isTrigger}
        setIsTrigger={setIsTrigger}
        handleClick={handleClick}
      />
      <Header open={open} handleClick={handleClick} />
      <main
        className={css`
          position: relative;
          width: 100%;
        `}
      >
        <article>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <HomePage pageName={location.pathname} notifier={setOpen} />
              }
            />
            <Route
              path="/adsense"
              element={
                <AdsPage pageName={location.pathname} notifier={setOpen} />
              }
            />
            <Route
              path="/tag"
              element={
                <TagPage pageName={location.pathname} notifier={setOpen} />
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
