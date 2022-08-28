import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';

import {HomePage} from './pages/home';
import {NotFoundPage} from './pages/not-found';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';
import {Spacer} from './components/Spacer';

const App = () => {
  const location = useLocation();
  return (
    <div
      className={css`
        width: 100%;
        position: relative;
      `}
    >
      <Header />
      <Spacer height="3rem" />
      <main>
        <article>
          <Routes location={location}>
            <Route
              path={'/'}
              element={
                <HomePage pageName={location.pathname} notifier={() => {}} />
              }
            />
            <Route
              path={'/*'}
              element={
                <NotFoundPage
                  pageName={location.pathname}
                  notifier={() => {}}
                />
              }
            />
          </Routes>
        </article>
      </main>
      <Spacer height="3rem" />
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
