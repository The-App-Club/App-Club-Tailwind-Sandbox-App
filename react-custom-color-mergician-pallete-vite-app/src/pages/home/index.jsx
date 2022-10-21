import { css, cx } from '@emotion/css';
import { motion, useTransform, useScroll } from 'framer-motion';
import easing from 'bezier-easing';
import logo from '@/assets/logo.png';
import { Spacer } from '@/components/Spacer';
import { Layout } from '@/layouts/default';
import { Paragraph1 } from '@/components/Paragraph1';
import { Paragraph2 } from '@/components/Paragraph2';
import { Paragraph3 } from '@/components/Paragraph3';
import { MarkedDescription1 } from '@/components/MarkedDescription1';
import { MarkedDescription2 } from '@/components/MarkedDescription2';
import { MarkedDescription3 } from '@/components/MarkedDescription3';

import { useRecoilState } from 'recoil';
import { scrollTriggerState } from '@/stores/scrollTriggerStore';
import { useEffect } from 'react';
import { useRef } from 'react';

const doEaseOutExpo = (x) => {
  // https://easings.net/#easeOutExpo
  return easing(0.16, 1, 0.3, 1)(x);
};

const doEaseOutQuart = (x) => {
  // https://easings.net/#easeOutQuart
  return easing(0.25, 1, 0.5, 1)(x);
};

const doEaseOutElastic = (x) => {
  // https://easings.net/#easeOutElastic
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

const HomePage = () => {
  const [scrollTrigger, setScrollTrigger] = useRecoilState(scrollTriggerState);
  const { scrollY, scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0],
    { ease: doEaseOutExpo }
  );
  const x = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [-30, 0, 0, -30], {
    ease: doEaseOutExpo,
  });
  const y = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [70, 0, 0, 70], {
    ease: doEaseOutExpo,
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // console.log(`scrollYProgress`, latest);
      setScrollTrigger((prevState) => {
        return {
          progress: latest,
        };
      });
    });
  }, []);

  return (
    <Layout>
      <div
        className={cx(
          css`
            position: sticky;
            top: 3rem;
            left: 0;
            width: 100%;
            height: calc(50vh - 3rem);
            @media (max-width: 768px) {
            }
          `,
          `flex items-center justify-center flex-col`
        )}
      >
        <div className="relative">
          <motion.img
            style={{
              opacity,
              x,
              y,
            }}
            src={logo}
            alt={'logo'}
            width={220}
          />
          <MarkedDescription1 />
          <MarkedDescription2 />
          <MarkedDescription3 />
        </div>
      </div>
      <div
        className={css`
          width: 100%;
          margin-top: 50%;
        `}
      >
        <section className="min-h-[200vh] p-2 max-w-md m-auto">
          <h2 className="text-bebop-100">Bebop</h2>
          <h2 className="text-bebop-200">Bebop</h2>
          <h2 className="text-bebop-300">Bebop</h2>
          <h2 className="text-bebop-400">Bebop</h2>
          <Paragraph1 />
          <Spacer height="90vh" />
          <Paragraph2 />
          <Spacer height="110vh" />
          <Paragraph3 />
          <Spacer height="120vh" />
        </section>
      </div>
    </Layout>
  );
};

export { HomePage };
