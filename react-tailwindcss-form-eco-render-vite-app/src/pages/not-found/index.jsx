import {css, cx} from '@emotion/css';
import {Link} from 'react-router-dom';
import {Spacer} from '../../components/Spacer';
import {default as Layout} from '../../layouts/default';

const NotFoundPage = ({notifier}) => {
  return (
    <Layout notifier={notifier} className={`px-2`}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative flex flex-col items-center px-2`,
          css`
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">Not Found</h2>
        <Link to={'/'} className={`hover:underline`}>
          Back to home
        </Link>
      </section>
    </Layout>
  );
};

export {NotFoundPage};
