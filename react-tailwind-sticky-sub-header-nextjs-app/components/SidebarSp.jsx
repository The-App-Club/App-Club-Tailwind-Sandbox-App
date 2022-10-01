import {css, cx} from '@emotion/css';
import {useDebouncedCallback} from 'use-debounce';
import {motion, useAnimationControls} from 'framer-motion';
import {gsap, Power3, Linear} from 'gsap';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useClickOutside} from '../hooks/useClickOutside';
import hamburgerState from '../stores/hamburgerStore';
import Nav from './Nav';
import Hamburger from './Hamburger';
const SidebarSp = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);
  const containerDomRef = useRef();

  const handleResize = useDebouncedCallback((e) => {
    if (opened) {
      const html = document.documentElement;
      const body = document.body;
      html.classList.remove('loading');
      body.classList.remove('loading');
      gsap.to(containerDomRef.current, {
        x: `-100%`,
        duration: 0.01,
        ease: Linear.easeNone,
        onComplete: function () {
          setHamburger((prevState) => {
            return {
              opened: false,
              isTrigger: prevState.isTrigger,
            };
          });
        },
      });
    }
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useClickOutside(containerDomRef, (e) => {
    if (!hamburger.isTrigger) {
      setHamburger((prevState) => {
        return {
          opened: false,
          isTrigger: prevState.isTrigger,
        };
      });
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (opened) {
      html.classList.add('loading');
      body.classList.add('loading');
      gsap.to(containerDomRef.current, {
        x: `0%`,
        opacity: 1,
        duration: 0.4,
        ease: Power3.easeOut,
        onComplete: function () {
          setHamburger((prevState) => {
            return {
              opened: prevState.opened,
              isTrigger: false,
            };
          });
        },
      });
    } else {
      html.classList.remove('loading');
      body.classList.remove('loading');
      gsap.to(containerDomRef.current, {
        x: `-100%`,
        opacity: 0,
        duration: 0.4,
        ease: Power3.easeIn,
        onComplete: function () {
          setHamburger((prevState) => {
            return {
              opened: prevState.opened,
              isTrigger: false,
            };
          });
        },
      });
    }
  }, [opened, setHamburger]);

  return (
    <motion.aside
      ref={containerDomRef}
      className={cx(
        css`
          opacity: 0;
          z-index: 4;
          transform: translate(0%, 0%);
          max-width: 18rem;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          min-height: 100vh;
          overflow: hidden;
          overflow-y: auto;
          display: none;
          @media (max-width: 768px) {
            display: flex;
          }
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
        `,
        `scrollbar-none`,
        `bg-white dark:bg-slate-700 dark:text-white`,
        `border-r-2`
      )}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -60,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -60,
        }}
        className={cx(
          css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 3rem;
          `,
          `flex items-center gap-2 border-b-2`
        )}
      >
        <picture className={css``}>
          <source srcSet={`/assets/logo.png`} type={`image/png`} />
          <img src={'/assets/logo.png'} alt={'logo'} width={40} height={40} />
        </picture>
        <h3 className="text-2xl">Menu</h3>
      </motion.div>
      <Hamburger
        className={cx(
          css`
            position: absolute;
            top: 0;
            right: 0;
            min-height: 3rem;
          `,
          `flex items-center`
        )}
      />
      <Nav />
    </motion.aside>
  );
};

export default SidebarSp;
