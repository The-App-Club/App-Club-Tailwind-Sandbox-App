import {css, cx} from '@emotion/css';
import {default as Layout} from './default';
import {Sidebar} from '../components/Sidebar';
import {MainFeeder} from '../components/MainFeeder.';
import {BlogStats} from '../components/BlogStats';
import {Trending} from '../components/Trending';
import {Bookmarks} from '../components/Bookmarks';
import {AdsSidebar} from '../components/AdsSidebar';

import {useBlogFetchType} from '../hooks/useBlogFetchType';
import {useTrendingFetchType} from '../hooks/useTrendingFetchType';

const AdsPageLayout = ({pageName, notifier, children}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-7xl mx-auto w-full relative`)}>
        <h2 className="text-3xl flex items-center justify-center">AdsPage</h2>
        <div className={cx(css``, `p-2 flex w-full items-start gap-4`)}>
          <AdsSidebar
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 900px) {
                display: none;
              }
            `}
          />
          {children}
          <AdsSidebar
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 900px) {
                display: none;
              }
            `}
          />
        </div>
      </section>
    </Layout>
  );
};

export {AdsPageLayout};
