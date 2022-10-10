import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilState} from 'recoil';
import hamburgerState from '../stores/hamburgerStore';
import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';
import {motion} from 'framer-motion';
import {FiSettings} from 'react-icons/fi';
import {
  MdOutlineLogout,
  MdOutlineShoppingCart,
  MdOutlineNotificationsNone,
} from 'react-icons/md';

import Profile from './Profile';

const Header = ({pathname}) => {
  const router = useRouter();
  const nicePosition = useMemo(() => {
    if (
      pathname === `/` ||
      pathname === `/contact` ||
      pathname === `/feed` ||
      pathname === `/favorite` ||
      pathname === `/notification` ||
      pathname === `/cart` ||
      pathname === `/location` ||
      pathname === `/about` ||
      pathname === `/price`
    ) {
      return css`
        left: 18rem;
        max-width: calc(100% - 18rem);
      `;
    }
    return css`
      left: 0rem;
      max-width: calc(100% - 0rem);
    `;
  }, [pathname]);

  return (
    <motion.header
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.7,
        ease: 'linear',
      }}
      className={cx(
        css`
          position: fixed;
          z-index: 4;
          top: 0;
          width: 100%;
          min-height: 3rem;
          transition: left 0.2s ease 250ms, max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
        `,
        nicePosition,
        `px-2`,
        `flex items-center bg-white`,
        `dark:bg-slate-700 dark:text-white`,
        `border-b-2`
      )}
    >
      <div className="relative w-full flex items-center gap-2">
        <Hamburger
          className={css`
            display: none;
            opacity: 0;
            @media (max-width: 768px) {
              display: block;
              opacity: 1;
            }
          `}
        />
        <div className="absolute right-2 flex items-center gap-2">
          <ThemeToggle />
          <div
            className="w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={(e) => {
              router.push({
                pathname: '/cart',
              });
            }}
          >
            <MdOutlineShoppingCart size={24} />
          </div>
          <div
            className="w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={(e) => {
              router.push({
                pathname: '/notification',
              });
            }}
          >
            <MdOutlineNotificationsNone size={24} />
          </div>
          <Profile
            menuData={[
              {
                id: 0,
                name: `Setting`,
                pathname: `/setting`,
                icon: () => {
                  return <FiSettings size={24} />;
                },
              },
              {
                id: 1,
                name: `Logout`,
                pathname: `/logout`,
                icon: () => {
                  return <MdOutlineLogout size={24} />;
                },
              },
            ]}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
