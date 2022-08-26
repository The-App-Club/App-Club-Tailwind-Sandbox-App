import {css, cx} from '@emotion/css';
import {Toc} from '../../components/Toc';
import {useLocation, useNavigate} from 'react-router-dom';
import {Spacer} from '../../components/Spacer';
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
    <div
      className={cx(css`
        position: relative;
        width: 100%;
        display: flex;
        gap: 1rem;
        @media (max-width: 1000px) {
          aside {
            order: 1;
          }
          article {
            order: 2;
          }
          justify-content: flex-start;
          flex-direction: column;
        }
        @media (max-width: 768px) {
        }
      `)}
    >
      <section
        className={cx(
          `max-w-2xl mx-auto w-full relative pt-12`,
          css`
            width: 100%;
            h1 {
              font-size: 2rem;
            }
            h2 {
              font-size: 1.7rem;
            }
            h3 {
              font-size: 1.4rem;
            }
            p {
              font-size: 1.2rem;
            }
            h1:not(:first-child),
            h2,
            h3 {
              padding: 1rem 0 0;
            }
          `,
          `blog`
        )}
      >
        <div className="flex items-center justify-center text-3xl">
          ArticlePage
        </div>
        <motion.img src={state.heroImageURL} alt={state.title} />
        <h1 id={makeSlugURL()}>Chapter 1</h1>
        <LoremIpsum random={false} p={2} />
        <h2 id={makeSlugURL()}>Section 1</h2>
        <LoremIpsum random={false} p={2} />
        <h3 id={makeSlugURL()}>Section 1-1</h3>
        <LoremIpsum random={false} p={3} />
        <h3 id={makeSlugURL()}>Section 1-2</h3>
        <LoremIpsum random={false} p={2} />
        <h2 id={makeSlugURL()}>Section 2</h2>
        <LoremIpsum random={false} p={2} />
        <h3 id={makeSlugURL()}>Section 2-1</h3>
        <LoremIpsum random={false} p={3} />
        <h1 id={makeSlugURL()}>Chapter 2</h1>
        <LoremIpsum random={false} p={3} />
        <h2 id={makeSlugURL()}>Section 1</h2>
        <LoremIpsum random={false} p={2} />
        <h2 id={makeSlugURL()}>Section 2</h2>
        <LoremIpsum random={false} p={2} />
        <h2 id={makeSlugURL()}>Section 3</h2>
        <LoremIpsum random={false} p={2} />
        <h1 id={makeSlugURL()}>Chapter 3</h1>
        <LoremIpsum random={false} p={3} />
        <motion.div>{state.usename}</motion.div>
        <motion.img src={state.thumbnail} alt={state.usename} />
        <motion.div>{state.siteURL}</motion.div>
        <Spacer height={`30rem`} />
      </section>
      <Toc
        pageName={pageName}
        className={css`
          @media (max-width: 1000px) {
            min-width: 20rem;
            height: 100%;
            position: relative;
            top: initial;
          }
        `}
      />
    </div>
  );
};

export {ArticlePage};
