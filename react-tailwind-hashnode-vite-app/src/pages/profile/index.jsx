import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';

const ProfilePage = ({pageName, notifier}) => {
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
          <h2 className="text-3xl">ProfilePage</h2>
          <motion.div>{state.usename}</motion.div>
          <motion.img src={state.thumbnail} alt={state.usename} />
          <motion.div>{state.siteURL}</motion.div>
        </div>
      </section>
    </Layout>
  );
};

export {ProfilePage};
