import {css, cx} from '@emotion/css';
import {Link} from 'react-router-dom';
import {default as Layout} from '../../layouts/default';

const HomePage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(
          css`
            min-height: 100vh;
          `,
          `max-w-7xl mx-auto w-full relative flex flex-col items-center pt-12`
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        <Link to={'/adsense'} className={'hover:underline'}>
          <span>Go Ads Page</span>
        </Link>
      </section>
    </Layout>
  );
};

export {HomePage};
