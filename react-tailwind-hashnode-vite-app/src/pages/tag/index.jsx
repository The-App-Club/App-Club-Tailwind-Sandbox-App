import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const TagPage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl">TagPage</h2>
          <p>something...</p>
          <p>something...</p>
          <p>something...</p>
        </div>
      </section>
    </Layout>
  );
};

export {TagPage};
