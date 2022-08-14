import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {Sidebar} from '../../components/Sidebar';
import {MainFeeder} from '../../components/MainFeeder.';
import {useFeedFetchType} from '../../hooks/useFeedFetchType';
import {FeedType} from '../../components/FeedType';

const HomePage = ({pageName, notifier}) => {
  const {lastestFetchType, storeFetchType} = useFeedFetchType((state) => {
    return {
      lastestFetchType: state.lastestFetchType,
      storeFetchType: state.storeFetchType,
    };
  });

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-7xl mx-auto w-full relative`)}>
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        <div className={cx(css``, `pt-8 flex items-start gap-4`)}>
          <Sidebar
            className={css`
              position: sticky;
              top: 3rem;
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />
          <div>
            <FeedType />
            <MainFeeder fetchType={lastestFetchType} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {HomePage};
