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
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {Nav} from './components/Nav';

import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {ContactPage} from './pages/contact';
import {PricePage} from './pages/price';
import {DashboardPage} from './pages/dashboard';
import {AdsPage} from './pages/adsense';
import {EventPage} from './pages/event';
import {TagPage} from './pages/tag';
import {ResultPage} from './pages/result';
import {NotFoundPage} from './pages/not-found';
import {BookmarkPage} from './pages/bookmarks';
import {ProfilePage} from './pages/profile';
import {ArticlePage} from './pages/article';

import logo from './assets/logo.png';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';
import {Article} from './components/Article';
import {Toc} from './components/Toc';

const makeSlugURL = () => {
  return name().toLowerCase();
};

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
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 100%;
        min-height: 100vh;
      `}
    >
      <ScrollToTop />
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
          width: 100%;
          height: 100%;
        `}
      >
        <article>
          <Routes location={location}>
            {[
              {
                route: '/',
                component: () => {
                  return (
                    <HomePage pageName={location.pathname} notifier={setOpen} />
                  );
                },
              },
              {
                route: '/about',
                component: () => {
                  return (
                    <AboutPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/contact',
                component: () => {
                  return (
                    <ContactPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/price',
                component: () => {
                  return (
                    <PricePage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/dashboard',
                component: () => {
                  return (
                    <DashboardPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/adsense',
                component: () => {
                  return (
                    <AdsPage pageName={location.pathname} notifier={setOpen} />
                  );
                },
              },
              {
                route: '/events',
                component: () => {
                  return (
                    <EventPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/result',
                component: () => {
                  return (
                    <ResultPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/tag',
                component: () => {
                  return (
                    <TagPage pageName={location.pathname} notifier={setOpen} />
                  );
                },
              },
              {
                route: '/bookmark',
                component: () => {
                  return (
                    <BookmarkPage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/profile',
                component: () => {
                  return (
                    <ProfilePage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/article',
                component: () => {
                  return (
                    <ArticlePage
                      pageName={location.pathname}
                      notifier={setOpen}
                    />
                  );
                },
              },
              {
                route: '/*',
                component: () => {
                  return (
                    <NotFoundPage
                      pageName={location.pathname}
                      notifier={setOpen}
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
