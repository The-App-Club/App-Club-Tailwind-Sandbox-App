import {css, cx} from '@emotion/css';
import {default as Layout} from './default';
import {SidebarAds} from '../components/SidebarAds';
import {SidebarMenu} from '../components/SidebarMenu';

const AdsPageLayout = ({pageName, notifier, children}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-7xl mx-auto w-full relative pt-12`)}>
        <h2 className="text-3xl flex items-center justify-center">AdsPage</h2>
        <div
          className={cx(
            css`
              @media (max-width: 1200px) {
                max-width: 48rem;
                width: 100%;
                align-items: center;
                margin: 0 auto;
              }
            `,
            `p-2 flex w-full items-start gap-4`
          )}
        >
          <SidebarMenu
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 1200px) {
                display: none;
              }
            `}
          />
          {children}
          <SidebarAds
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 1200px) {
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
