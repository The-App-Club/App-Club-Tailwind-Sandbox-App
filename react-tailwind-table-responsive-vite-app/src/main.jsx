import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useRef, useCallback, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import gsap, {Power3} from 'gsap';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {SidebarTooltip} from './components/SidebarTooltip';
import {Breadcrumbs} from './components/Breadcrumbs';
import {ScrollToTop} from './components/ScrollToTop';

import {HomePage} from './pages/home';
import {NotFoundPage} from './pages/not-found';
import {DashboardPage} from './pages/dashboard';

import logo from './assets/logo.png';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';

const App = () => {
  const mainDomRef = useRef();
  const location = useLocation();
  const [isTrigger, setIsTrigger] = useState(false);
  const [opened, setOpened] = useState(false);
  const [sidebarOverflowXHidden, setSidebarOverflowXHidden] = useState(false);
  const [sidebarMinWidth, setSidebarMinWidth] = useState(
    window.matchMedia('(max-width: 768px)').matches ? 0 : 48
  );
  const [sidebarMaxWidth, setSidebarMaxWidth] = useState(
    window.matchMedia('(max-width: 768px)').matches
      ? window.innerWidth * 0.9
      : 200
  );
  const doAutoCloseSideBar = useCallback((e) => {
    setOpened(false);
  }, []);
  const handleClick = useCallback((e) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setSidebarOverflowXHidden(true);
    }
    setOpened((opened) => {
      return !opened;
    });
    setIsTrigger(true);
  }, []);
  const doneSidebarAction = () => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    if (opened) {
      setSidebarOverflowXHidden(true);
    } else {
      setSidebarOverflowXHidden(false);
    }
  };

  const handleResize = useDebouncedCallback((e) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setSidebarMinWidth(0);
      setSidebarMaxWidth(window.innerWidth * 0.9);
    } else {
      setSidebarMinWidth(48);
      setSidebarMaxWidth(200);
    }
  }, 600);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        position: relative;
      `}
    >
      <ScrollToTop />
      <Header opened={opened} handleClick={handleClick} />
      <div
        className={`pt-12 flex flex-1 w-full h-full relative ${
          sidebarOverflowXHidden ? 'overflow-x-hidden' : ''
        }`}
      >
        <Sidebar
          opened={opened}
          setOpened={setOpened}
          isTrigger={isTrigger}
          setIsTrigger={setIsTrigger}
          handleClick={handleClick}
          sidebarMinWidth={sidebarMinWidth}
          sidebarMaxWidth={sidebarMaxWidth}
          doneSidebarAction={doneSidebarAction}
        />
        <SidebarTooltip
          opened={opened}
          sidebarMinWidth={sidebarMinWidth}
          sidebarMaxWidth={sidebarMaxWidth}
        />
        <main
          ref={mainDomRef}
          className={css`
            --sidebar-width: ${opened ? sidebarMaxWidth : sidebarMinWidth}px;
            position: absolute;
            left: var(--sidebar-width);
            width: calc(100% - var(--sidebar-width));
            transition: left 0.2s ease ${opened ? 0 : 250}ms,
              width 0.2s ease ${opened ? 0 : 250}ms;
          `}
        >
          <Breadcrumbs
            className={cx(
              css`
                position: sticky;
                top: 3rem;
                z-index: 1;
              `,
              `w-full pl-2 bg-white`
            )}
            notifier={doAutoCloseSideBar}
          />
          <article className="w-full">
            <Routes location={location}>
              {[
                {
                  route: `/`,
                  component: () => {
                    return (
                      <HomePage
                        pageName={location.pathname}
                        notifier={doAutoCloseSideBar}
                      />
                    );
                  },
                },
                {
                  route: `/dashboard`,
                  component: () => {
                    return (
                      <DashboardPage
                        pageName={location.pathname}
                        notifier={doAutoCloseSideBar}
                      />
                    );
                  },
                },
                {
                  route: `/*`,
                  component: () => {
                    return (
                      <NotFoundPage
                        pageName={location.pathname}
                        notifier={doAutoCloseSideBar}
                      />
                    );
                  },
                },
              ].map((item, index) => {
                return (
                  <Route
                    key={index}
                    path={item.route}
                    element={item.component()}
                  />
                );
              })}
            </Routes>
          </article>
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
