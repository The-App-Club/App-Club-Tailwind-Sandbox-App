import {useEffect, useRef} from 'react';
import {useClickOutside} from '../hooks/useClickOutside';
import styled from '@emotion/styled';
import gsap, {Power3} from 'gsap';
import {css, cx} from '@emotion/css';
import {Link, useNavigate} from 'react-router-dom';
import {Hamburger} from './Hamburger';

import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineChat} from 'react-icons/md';
import {BiTimeFive} from 'react-icons/bi';
import {RiAdvertisementLine} from 'react-icons/ri';

import logo from '../assets/logo.png';
import useDarkMode from 'use-dark-mode';

const MenuItem = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();
  const darkMode = useDarkMode();
  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2 hover:cursor-pointer`,
        `border-l-2 border-transparent ${
          darkMode.value ? '' : 'hover:border-blue-900'
        }`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`
      )}
      onClick={(e) => {
        navigate(path, {
          state: {},
        });
      }}
    >
      {icon()}
      <Link to={path}>{menuTitle}</Link>
    </li>
  );
};

const Nav = ({open, setOpen, isTrigger, setIsTrigger, handleClick}) => {
  const navContainerDomRef = useRef();

  useClickOutside(navContainerDomRef, (e) => {
    // console.log(e);
    if (!isTrigger) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('loading');
      gsap.to(navContainerDomRef.current, {
        x: `100%`,
        duration: 0.6,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    } else {
      document.body.classList.add('loading');
      gsap.to(navContainerDomRef.current, {
        x: `0%`,
        duration: 0.6,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    }
  }, [open]);

  return (
    <nav
      ref={navContainerDomRef}
      className={cx(
        css`
          z-index: 3;
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
          <img src={logo} alt={'logo'} className={`w-10`} />
          <h3 className="text-2xl">Menu</h3>
        </div>
        <Hamburger
          open={open}
          handleClick={handleClick}
          className={css`
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
            path={'/adsense'}
            menuTitle={'Ads'}
            icon={() => {
              return <RiAdvertisementLine size={24} />;
            }}
          />
          <MenuItem
            path={'/topic'}
            menuTitle={'Topics'}
            icon={() => {
              return <MdOutlineChat size={24} />;
            }}
          />
          <MenuItem
            path={'/moment'}
            menuTitle={'Moments'}
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
    </nav>
  );
};

export {Nav};
