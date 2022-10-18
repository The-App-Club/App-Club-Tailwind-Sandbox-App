import { css, cx } from '@emotion/css';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { scrollTriggerState } from '../stores/scrollTriggerStore';
import { useScrollTrigger } from './ScrollTriggerProvider';

const MarkedDescription1 = () => {
  const controls = useAnimationControls();
  const { progress: shortHandProgress, action } =
    useRecoilValue(scrollTriggerState);
  const { progress: motionProgress } = useScrollTrigger();

  // useEffect(() => {
  //   if (action === "initial") {
  //     controls.set({
  //       opacity: 0,
  //       x: 60,
  //     });
  //     return;
  //   }
  //   if (action === "enter" || action === "enterback") {
  //     controls.start({
  //       opacity: 1,
  //       x: 0,
  //     });
  //     return;
  //   }
  //   if (action === "leave" || action === "leaveback") {
  //     controls.start({
  //       opacity: 0,
  //       x: 60,
  //     });
  //     return;
  //   }
  // }, [controls, action]);

  useEffect(() => {
    if (shortHandProgress < 0.1) {
      controls.start({
        opacity: 0,
        x: 60,
      });
    }
    if (shortHandProgress > 0.2) {
      controls.start({
        opacity: 1,
        x: 0,
      });
    }
    if (shortHandProgress > 0.3) {
      controls.start({
        opacity: 0,
        x: 60,
      });
    }
  }, [controls, shortHandProgress]);

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: 60,
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
          padding: 1rem;
          position: absolute;
          top: 0;
          right: -18rem;
          @media (max-width: 768px) {
            position: absolute;
            top: 15rem;
            right: 0;
          }
          ::before {
            content: ' ';
            width: 180px;
            height: 3px;
            position: absolute;
            top: 1rem;
            left: 0;
            transform-origin: top left;
            rotate: 154deg;
            @media (max-width: 768px) {
              width: 135px;
              top: 0;
              left: calc(100% - 4rem);
              rotate: -96deg;
            }
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`,
        `bg-white`
      )}
    >
      <p className={cx('capitalize-first', 'first-letter:text-3xl')}>
        lorem Ipsum is simply dummy text of the printing and typesetting
        industry.Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </p>
    </motion.aside>
  );
};

export { MarkedDescription1 };
