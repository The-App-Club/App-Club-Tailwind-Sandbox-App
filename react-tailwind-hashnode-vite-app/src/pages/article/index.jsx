import {css, cx} from '@emotion/css';
import {useLocation, useNavigate} from 'react-router-dom';
import {default as Layout} from '../../layouts/default';
import {motion} from 'framer-motion';
import {LoremIpsum, name} from 'react-lorem-ipsum';

const makeSlugURL = () => {
  return name().toLowerCase();
};
const ArticlePage = ({pageName, notifier}) => {
  const location = useLocation();

  const {state} = location;

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(css``, `max-w-2xl mx-auto w-full relative pt-12`, `blog`)}
      >
        <h2 className="flex items-center justify-center text-3xl">
          ArticlePage
        </h2>
        <motion.img src={state.heroImageURL} alt={state.title} />
      </section>
    </Layout>
  );
};

export {ArticlePage};
