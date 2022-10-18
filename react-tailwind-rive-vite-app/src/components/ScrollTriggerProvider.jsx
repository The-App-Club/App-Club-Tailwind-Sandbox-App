import { css, cx } from '@emotion/css';
import { motion, useAnimationControls, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { MathUtils } from 'three';

import { scrollTriggerState } from '../stores/scrollTriggerStore';

const lockBebop = css`
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
`;

const unlockBebop = css`
  position: initial !important;
  opacity: 0;
  transition: opacity 0.4s ease-in;
`;

const magicBebop = css`
  opacity: 1;
  transition: opacity 0.4s ease-in;
`;

const ScrollTriggerContext = createContext({
  progress: 0,
});

const ScrollTriggerProvider = ({
  children,
  pcSectionHeight,
  spSectionHeight,
}) => {
  const [scrollTrigger, setScrollTrigger] = useRecoilState(scrollTriggerState);
  const [leave, setLeave] = useState(false);

  const controls = useAnimationControls();
  const scrollTriggerRef = useRef(null);
  const progress = useMotionValue(0);

  const value = useMemo(() => {
    return {
      progress,
    };
  }, [progress]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.matchMedia({
      '(min-width: 769px)': () => {
        ScrollTrigger.create({
          trigger: scrollTriggerRef.current,
          start: 'top top',
          end: `bottom+=${pcSectionHeight} top`,
          toggleClass: 'is-crossed',
          anticipatePin: 1,
          markers: false,
          scrub: 1,
          pin: true,
          onUpdate: (e) => {
            const p = MathUtils.clamp(e.progress, 0, 1);
            progress.set(p);
            setScrollTrigger((prevState) => {
              return {
                progress: p,
                action: prevState.action,
              };
            });
          },
          onEnter: (e) => {
            console.log('[enter]');
            controls.start({
              opacity: 1,
              y: 0,
            });
            setLeave(false);
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'enter',
              };
            });
          },
          onLeave: (e) => {
            console.log('[leave]');
            setLeave(true);
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'leave',
              };
            });
          },
          onEnterBack: (e) => {
            console.log('[enterback]');
            setLeave(false);
            controls.start({
              opacity: 1,
              y: 0,
            });
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'enterback',
              };
            });
          },
          onLeaveBack: (e) => {
            console.log('[leaveback]');
            controls.start({
              opacity: 0,
              y: 60,
            });
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'leaveback',
              };
            });
          },
        });
      },
      '(max-width: 768px)': () => {
        ScrollTrigger.create({
          trigger: scrollTriggerRef.current,
          start: 'top top',
          end: `bottom+=${spSectionHeight} top`,
          toggleClass: 'is-crossed',
          anticipatePin: 1,
          markers: false,
          scrub: 1,
          pin: true,
          onUpdate: (e) => {
            const p = MathUtils.clamp(e.progress, 0, 1);
            progress.set(p);
            setScrollTrigger((prevState) => {
              return {
                progress: p,
                action: prevState.action,
              };
            });
          },
          onEnter: (e) => {
            console.log('[enter]');
            controls.start({
              opacity: 1,
              y: 0,
            });
            setLeave(false);
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'enter',
              };
            });
          },
          onLeave: (e) => {
            console.log('[leave]');
            setLeave(true);
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'leave',
              };
            });
          },
          onEnterBack: (e) => {
            console.log('[enterback]');
            setLeave(false);
            controls.start({
              opacity: 1,
              y: 0,
            });
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'enterback',
              };
            });
          },
          onLeaveBack: (e) => {
            console.log('[leaveback]');
            controls.start({
              opacity: 0,
              y: 60,
            });
            setScrollTrigger((prevState) => {
              return {
                progress: prevState.progress,
                action: 'leaveback',
              };
            });
          },
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={scrollTriggerRef}
      className={cx(lockBebop, leave ? unlockBebop : magicBebop)}
    >
      <ScrollTriggerContext.Provider value={value}>
        <motion.div
          className="relative"
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={controls}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      </ScrollTriggerContext.Provider>
    </div>
  );
};

const useScrollTrigger = () => {
  return useContext(ScrollTriggerContext);
};

export { ScrollTriggerProvider, useScrollTrigger };
