import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {Scrollbars} from 'rc-scrollbars';

import {Sidebar} from './components/Sidebar';
import {Header} from './components/Header';
// import Breadcrumbs from './components/Breadcrumbs';

import {HomePage} from './pages/home';
import {NotFoundPage} from './pages/not-found';
import {AnimatePresence} from 'framer-motion';
import {Nav} from './components/Nav';
// import {Layout as Popup} from './layouts/popup';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';

const App = () => {
  const location = useLocation();
  const [isTrigger, setIsTrigger] = useState(false);
  const [opened, setOpened] = useState(false);

  const doAutoCloseSideBar = useCallback((e) => {
    // console.log(e);
    setOpened(false);
  }, []);

  const handleClick = useCallback((e) => {
    setOpened((opened) => {
      return !opened;
    });
    setIsTrigger(true);
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        position: relative;
      `}
    >
      <Nav
        open={opened}
        setOpen={setOpened}
        isTrigger={isTrigger}
        setIsTrigger={setIsTrigger}
        handleClick={handleClick}
      />
      <Header open={opened} handleClick={handleClick} />

      <div
        className={css`
          position: absolute;
          top: 3rem;
          width: 100%;
          display: flex;
        `}
      >
        <Sidebar
          opened={opened}
          setOpened={setOpened}
          isTrigger={isTrigger}
          setIsTrigger={setIsTrigger}
          handleClick={handleClick}
        />
        <main
          className={cx(
            css`
              flex: 1;
              overflow: hidden;
              height: calc(100vh - 3rem);
              /* overflow-y: auto; */
            `
          )}
        >
          {/* <AnimatePresence>
            {opened && (
              <Popup
                className={css`
                  height: 100%;
                  display: none;
                  @media (max-width: 768px) {
                    display: block;
                  }
                `}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3);
                  `}
                />
              </Popup>
            )}
          </AnimatePresence> */}
          {/* <Breadcrumbs
            className={css`
              padding-left: 0.5rem;
              width: 100%;
            `}
            notifier={doAutoCloseSideBar}
          /> */}
          <Scrollbars
            className={css`
              width: 100%;
            `}
          >
            <article>
              <Routes location={location}>
                <Route
                  path={'/'}
                  element={
                    <HomePage
                      pageName={location.pathname}
                      notifier={doAutoCloseSideBar}
                    />
                  }
                />
                <Route
                  path={'/*'}
                  element={
                    <NotFoundPage
                      pageName={location.pathname}
                      notifier={doAutoCloseSideBar}
                    />
                  }
                />
              </Routes>
            </article>
          </Scrollbars>
        </main>
      </div>
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
