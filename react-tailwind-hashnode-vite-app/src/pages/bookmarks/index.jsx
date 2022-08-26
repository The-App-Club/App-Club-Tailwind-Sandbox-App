import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const BookmarkPage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative pt-12`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl">BookmarkPage</h2>
        </div>
      </section>
    </Layout>
  );
};

export {BookmarkPage};
