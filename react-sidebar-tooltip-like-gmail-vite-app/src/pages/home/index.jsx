import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const HomePage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative border-2 pb-12`,
          css`
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        {[...Array(100)].map((_, index) => {
          return <p key={index}>{`something... ${index}`}</p>;
        })}
      </section>
    </Layout>
  );
};

export {HomePage};
