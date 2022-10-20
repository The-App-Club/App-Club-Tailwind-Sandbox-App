import { css, cx } from '@emotion/css';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { scrollTriggerState } from '@/stores/scrollTriggerStore';

const MarkedDescription3 = () => {
  const controls = useAnimationControls();
  const { progress: shortHandProgress } = useRecoilValue(scrollTriggerState);

  useEffect(() => {
    if (shortHandProgress < 0.7) {
      controls.start({
        opacity: 0,
        y: 30,
      });
    }
    if (shortHandProgress > 0.8) {
      controls.start({
        opacity: 1,
        y: 0,
      });
    }
    if (shortHandProgress > 0.9) {
      controls.start({
        opacity: 0,
        y: 30,
      });
    }
  }, [controls, shortHandProgress]);

  return (
    <motion.aside
      initial={{
        opacity: 0,
        y: 30,
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
          top: 16rem;
          left: -4rem;
          padding: 1rem;
          @media (max-width: 768px) {
            position: absolute;
            top: calc(100% - 1rem);
            left: -3.5rem;
          }
          ::before {
            content: ' ';
            width: 160px;
            height: 3px;
            position: absolute;
            top: 0;
            right: -130px;
            transform-origin: top left;
            rotate: -64deg;
            @media (max-width: 768px) {
              width: 120px;
              position: absolute;
              top: -1px;
              left: calc(100% - 3rem);
              rotate: -48deg;
            }
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`,
        `bg-white`
      )}
    >
      <p className={cx('capitalize-first', 'first-letter:text-3xl')}>
        page when looking at its layout. The point of using Lorem Ipsum is that
        it has a more-or-less normal distribution of letters.
      </p>
    </motion.aside>
  );
};

export { MarkedDescription3 };
