import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const TopicPage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <div
        className={cx(
          css``,
          `max-w-7xl mx-auto w-full relative flex flex-col items-center pt-12`
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">TopicPage</h2>
      </div>
    </Layout>
  );
};

export {TopicPage};
