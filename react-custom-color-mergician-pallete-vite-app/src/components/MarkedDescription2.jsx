import { css, cx } from '@emotion/css';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { scrollTriggerState } from '@/stores/scrollTriggerStore';

const MarkedDescription2 = () => {
  const controls = useAnimationControls();
  const { progress: shortHandProgress } = useRecoilValue(scrollTriggerState);

  useEffect(() => {
    if (shortHandProgress < 0.4) {
      controls.start({
        opacity: 0,
        x: -30,
      });
    }
    if (shortHandProgress > 0.5) {
      controls.start({
        opacity: 1,
        x: 0,
      });
    }
    if (shortHandProgress > 0.6) {
      controls.start({
        opacity: 0,
        x: -30,
      });
    }
  }, [controls, shortHandProgress]);

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: -30,
      }}
      animate={controls}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      className={cx(
        css`
          width: 12rem;
          height: 16rem;
          position: absolute;
          top: 0;
          left: -12rem;
          padding: 1rem;
          @media (max-width: 768px) {
            position: absolute;
            top: 13rem;
            left: -3rem;
          }
          ::before {
            content: ' ';
            width: 180px;
            height: 3px;
            position: absolute;
            top: 1rem;
            right: -180px;
            transform-origin: top left;
            rotate: 28deg;
            @media (max-width: 768px) {
              width: 140px;
              position: absolute;
              top: 0;
              left: calc(100% - 4rem);
              rotate: -74deg;
            }
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`,
        `bg-white`
      )}
    >
      <p className={cx('capitalize-first', 'first-letter:text-3xl')}>
        you are going to use a passage of Lorem Ipsum, you need to be sure there
        isn't anything embarrassing hidden in the middle of text
      </p>
    </motion.aside>
  );
};

export { MarkedDescription2 };
