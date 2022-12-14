import {css, cx} from '@emotion/css';
import {useLocation} from 'react-router-dom';
import {default as Layout} from '../../layouts/default';

const TagPage = ({pageName, notifier}) => {
  const location = useLocation();
  const {state} = location;
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative pt-12`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl">TagPage</h2>
          <p>{`selected tag is ${state.tagName}`}</p>
        </div>
      </section>
    </Layout>
  );
};

export {TagPage};
