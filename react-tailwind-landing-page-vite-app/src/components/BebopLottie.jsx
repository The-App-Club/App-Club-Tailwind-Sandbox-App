import {css, cx} from '@emotion/css';
import animationData from '../lotties/77-im-thirsty.json';
import {memo, useEffect, useMemo, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useLottie, useLottieInteractivity} from 'lottie-react';
import {MathUtils} from 'three';
import {useDebouncedCallback} from 'use-debounce';
import {Layout} from '../layouts/popup';
import {motion, AnimatePresence, useAnimationControls} from 'framer-motion';

const BebopLottie = ({className, children, notifier, isDebug = false}) => {
  const controls = useAnimationControls();
  const itemDomRef = useRef(null);

  // https://lottiereact.com/hooks/useLottie#params
  const {goToAndStop, animationContainerRef, View, animationItem} = useLottie(
    {
      animationData,
      loop: false,
      autoplay: false,
      className: css`
        width: 300px;
        height: 300px;
        @media (max-width: 768px) {
          width: 280px;
          height: 280px;
        }
      `,
    },
    {}
  );

  const handleResize = useDebouncedCallback((e) => {
    setUpScrollTrigger();
  }, 500);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setUpScrollTrigger = () => {
    const itemDom = itemDomRef.current;
    // https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.matchMedia()
    ScrollTrigger.matchMedia({
      '(min-width: 769px)': function () {
        gsap.timeline({
          scrollTrigger: {
            id: 'pc-trigger',
            trigger: itemDom,
            start: 'top 10%',
            end: 'bottom+=300% top',
            pin: true,
            markers: isDebug,
            scrub: true,
            onUpdate: function (e) {
              const p = MathUtils.clamp(e.progress, 0, 1);
              const maxFrames = animationItem.totalFrames;
              const frame = maxFrames * p;
              // console.log(p, frame, maxFrames);
              animationItem.goToAndStop(frame, true);
              notifier({progress: p});
            },
          },
        });
      },

      '(max-width: 768px)': function () {
        gsap.timeline({
          scrollTrigger: {
            id: 'sp-trigger',
            trigger: itemDom,
            start: 'top 20%',
            end: 'bottom+=900% top',
            pin: true,
            markers: isDebug,
            scrub: true,
            onUpdate: function (e) {
              const p = MathUtils.clamp(e.progress, 0, 1);
              const maxFrames = animationItem.totalFrames;
              const frame = maxFrames * p;
              // console.log(p, frame, maxFrames);
              animationItem.goToAndStop(frame, true);
              notifier({progress: p});
            },
          },
        });
      },
    });
  };

  useEffect(() => {
    if (!animationItem) {
      ScrollTrigger.getById('pc-trigger')?.kill();
      ScrollTrigger.getById('sp-trigger')?.kill();
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    setUpScrollTrigger();
    return () => {};
  }, [animationItem]);

  return (
    <div
      ref={itemDomRef}
      className={cx(
        css`
          width: 100%;
          min-height: 30rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
          gap: 2rem;
        `,
        className
      )}
    >
      {View}
      <motion.div animate={controls}>{children}</motion.div>
    </div>
  );
};

export default memo(BebopLottie);
