import {useEffect, useRef} from 'react';
import gsap, {Power3} from 'gsap';
import {motion, useAnimationControls} from 'framer-motion';
import {css, cx} from '@emotion/css';
import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineChat} from 'react-icons/md';
import {BiTimeFive} from 'react-icons/bi';
import {RiAdvertisementLine} from 'react-icons/ri';
import Link from 'next/link';

import {useClickOutside} from '../hooks/useClickOutside';
import Hamburger from './Hamburger';
import {useRecoilState, useRecoilValue} from 'recoil';
import themeState from '../stores/themeStore';
import {useRouter} from 'next/router';
import hamburgerState from '../stores/hamburgerStore';

const decideBorderColor = ({theme}) => {
  if (theme === `dark`) {
    return css``;
  }

  return `hover:border-blue-900`;
};

const MenuItem = ({path, menuTitle, icon}) => {
  const router = useRouter();
  const theme = useRecoilValue(themeState);
  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2 hover:cursor-pointer`,
        `border-l-2 border-transparent`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`,
        decideBorderColor({theme})
      )}
      onClick={(e) => {
        router.push({
          pathname: path,
        });
      }}
    >
      {icon()}
      <Link href={path}>
        <a>{menuTitle}</a>
      </Link>
    </li>
  );
};

const Nav = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);
  const navContainerDomRef = useRef();
  const controls = useAnimationControls();

  useClickOutside(navContainerDomRef, (e) => {
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
    controls.set({
      opacity: 1,
    });
    const html = document.documentElement;
    const body = document.body;
    if (opened) {
      html.classList.add('loading');
      body.classList.add('loading');
      gsap.to(navContainerDomRef.current, {
        x: `0%`,
        duration: 0.6,
        ease: Power3.easeInOut,
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
      gsap.to(navContainerDomRef.current, {
        x: `100%`,
        duration: 0.6,
        ease: Power3.easeInOut,
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
  }, [opened, setHamburger, controls]);

  return (
    <motion.nav
      ref={navContainerDomRef}
      initial={{
        opacity: 0,
      }}
      animate={controls}
      className={cx(
        css`
          opacity: 0;
          z-index: 4;
          transform: translate(100%, 0%);
          max-width: 22rem;
          @media (max-width: 768px) {
            max-width: 16rem;
          }
        `,
        `fixed top-0 right-0 min-h-screen`,
        `overflow-hidden overflow-y-auto scrollbar-none bg-gray-50`,
        `w-full h-full`,
        `flex justify-start items-start flex-col`,
        `dark:bg-slate-700 dark:text-white`,
        `border-l-2`
      )}
    >
      <div className="relative w-full">
        <div
          className={cx(
            css`
              position: absolute;
              top: 0.5rem;
              left: 0;
              width: 100%;
            `,
            `flex items-center gap-2 border-b-2`
          )}
        >
          <picture className={css``}>
            <source srcSet={`/assets/logo.png`} type={`image/png`} />
            <img
              src={'/assets/logo.png'}
              alt={'logo'}
              className={css`
                width: 40px;
                height: 40px;
              `}
            />
          </picture>
          <h3 className="text-2xl">Menu</h3>
        </div>
        <Hamburger
          className={css`
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
          `}
        />
        <ul
          className={css`
            padding-top: 3rem;
            width: 100%;
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          `}
        >
          <MenuItem
            path={'/'}
            menuTitle={'Home'}
            icon={() => {
              return <FiTwitter size={24} />;
            }}
          />
          <MenuItem
            path={'/about'}
            menuTitle={'About'}
            icon={() => {
              return <RiAdvertisementLine size={24} />;
            }}
          />
          <MenuItem
            path={'/contact'}
            menuTitle={'Contact'}
            icon={() => {
              return <MdOutlineChat size={24} />;
            }}
          />
          <MenuItem
            path={'/price'}
            menuTitle={'Price'}
            icon={() => {
              return <BiTimeFive size={24} />;
            }}
          />
          <MenuItem
            path={'/notification'}
            menuTitle={'Notification'}
            icon={() => {
              return <MdOutlineNotifications size={24} />;
            }}
          />
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
