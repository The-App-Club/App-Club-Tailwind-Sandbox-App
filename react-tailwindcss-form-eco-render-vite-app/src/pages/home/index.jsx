import {css, cx} from '@emotion/css';
import {Form} from '../../components/Form';
// import {Form} from '../../components/BigForm';
import {Spacer} from '../../components/Spacer';
import {default as Layout} from '../../layouts/default';

const HomePage = ({notifier}) => {
  return (
    <Layout notifier={notifier} className={`px-2`}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative`,
          css`
            min-height: 100vh;
            display: flex;
            align-items: center;
            flex-direction: column;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">Sign Up</h2>
        <Spacer />
        <Form />
      </section>
    </Layout>
  );
};

export {HomePage};
