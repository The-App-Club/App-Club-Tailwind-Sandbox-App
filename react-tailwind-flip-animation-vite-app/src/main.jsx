import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {Scrollbars} from 'rc-scrollbars';

import {Nav} from './components/Nav';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {Breadcrumbs} from './components/Breadcrumbs';
import {Footer} from './components/Footer';

import {HomePage} from './pages/home';
import {NotFoundPage} from './pages/not-found';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';

const App = () => {
  const location = useLocation();
  const [isTrigger, setIsTrigger] = useState(false);
  const [opened, setOpened] = useState(false);

  const doAutoCloseSideBar = useCallback((e) => {
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
          flex-direction: column;
        `}
      >
        <div className="w-full flex">
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
              `
            )}
          >
            <Breadcrumbs
              className={css`
                padding-left: 0.5rem;
                width: 100%;
              `}
              notifier={doAutoCloseSideBar}
            />
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
          </main>
        </div>
        {/* <Footer /> */}
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
