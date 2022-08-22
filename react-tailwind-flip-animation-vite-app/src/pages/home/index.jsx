import {css, cx} from '@emotion/css';
import Scrollbars from 'rc-scrollbars';
import {Spacer} from '../../components/Spacer';
import {default as Layout} from '../../layouts/default';

const HomePage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(`max-w-7xl mx-auto w-full h-full relative`, css``)}
      >
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
        {[...Array(300)].map((_, index) => {
          return <p key={index}>{`something... ${index}`}</p>;
          // return <Spacer key={index} height="30rem" />;
        })}
      </section>
    </Layout>
  );
};

export {HomePage};
