import {css, cx} from '@emotion/css';
import {default as Layout} from '../layouts/default';
import {Sidebar} from '../components/Sidebar';
import {MainFeeder} from '../components/MainFeeder.';
import {BlogStats} from '../components/BlogStats';
import {Trending} from '../components/Trending';
import {Bookmarks} from '../components/Bookmarks';
import {useBlogFetchType} from '../hooks/useBlogFetchType';
import {useTrendingFetchType} from '../hooks/useTrendingFetchType';

const HomePageLayout = ({pageName, notifier, children}) => {
  const {lastestFetchType: blogLastestFetchType} = useBlogFetchType((state) => {
    return {
      lastestFetchType: state.lastestFetchType,
    };
  });
  const {lastestFetchType: trendingLastestFetchType} = useTrendingFetchType(
    (state) => {
      return {
        lastestFetchType: state.lastestFetchType,
      };
    }
  );
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-7xl mx-auto w-full relative`)}>
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        <div className={cx(css``, `p-2 flex w-full items-start gap-4`)}>
          <Sidebar
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 900px) {
                display: none;
              }
            `}
          />
          {children}
          <div
            className={cx(
              css`
                @media (max-width: 768px) {
                  display: none;
                }
              `,
              `flex items-center flex-col gap-4`
            )}
          >
            <BlogStats fetchType={blogLastestFetchType} />
            <Trending fetchType={trendingLastestFetchType} />
            <Bookmarks />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {HomePageLayout};
