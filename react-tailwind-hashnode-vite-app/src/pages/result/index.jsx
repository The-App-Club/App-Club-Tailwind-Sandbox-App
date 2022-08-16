import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {useLocation} from 'react-router-dom';

const ResultPage = ({pageName, notifier}) => {
  const location = useLocation();
  const {
    state: {title},
  } = location;
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl">ResultPage</h2>
          <p className="text-2xl">{title}</p>
        </div>
      </section>
    </Layout>
  );
};

export {ResultPage};
