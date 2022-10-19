import { css, cx } from '@emotion/css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/home';

import '@fontsource/inter';
import '@/styles/index.css';
import '@/styles/index.scss';

const App = () => {
  const location = useLocation();
  return (
    <div
      className={cx(
        css`
          width: 100%;
          display: grid;
          grid-template-rows: auto 1fr auto;
          grid-template-columns: 100%;
          min-height: 100vh;
        `,
        `max-w-7xl m-auto`
      )}
    >
      <Header />
      <main>
        <article>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
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
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
