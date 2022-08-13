import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {default as Layout} from '../../layouts/default';
import {ArtistsPage} from '../artists';
import {FeaturesPage} from '../features';
import {PricingPage} from '../pricing';
import {QuestionPage} from '../question';
import {ServicePage} from '../service';

import logo from '../../assets/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react';
const HomePage = ({pageName, notifier}) => {
  useEffect(() => {
    // https://github.com/michalsnik/aos#predefined-options
    AOS.init({
      once: true,
      easing: 'ease-out-sine',
      duration: 600,
      delay: 700,
    });
  }, []);

  return (
    <>
      <Layout pageName={pageName} notifier={notifier}>
        <section className={cx(css``, `max-w-2xl mx-auto w-full relative p-2`)}>
          <div
            className={cx(
              css``,
              `pt-8 flex justify-center items-center flex-col gap-12`
            )}
          >
            <motion.h2
              className={css`
                font-size: 3.75rem;
                @media (max-width: 768px) {
                  font-size: 1.25rem;
                }
              `}
            >
              Malibu Nights Lion
            </motion.h2>
            <motion.img
              loading="lazy"
              type="image/png"
              initial={{
                y: 120,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: [120, 0],
                opacity: 1,
                scale: 1,
              }}
              transition={{
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 0.8,
                delay: 1.3,
              }}
              onAnimationStart={(e) => {}}
              onAnimationComplete={(e) => {}}
              src={logo}
              alt={'logo'}
              className={'w-64'}
            />
            <motion.p
              className="text-lg"
              initial={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                y: [30, 0],
                opacity: 1,
              }}
              transition={{
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 0.7,
                delay: 3.3,
              }}
            >
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested.
            </motion.p>
          </div>
        </section>
      </Layout>
      <ServicePage pageName={pageName} notifier={notifier} />
      <FeaturesPage pageName={pageName} notifier={notifier} />
      <ArtistsPage pageName={pageName} notifier={notifier} />
      <PricingPage pageName={pageName} notifier={notifier} />
      <QuestionPage pageName={pageName} notifier={notifier} />
    </>
  );
};

export {HomePage};
