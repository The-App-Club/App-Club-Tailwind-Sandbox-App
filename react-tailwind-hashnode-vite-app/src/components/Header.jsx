import {css, cx} from '@emotion/css';
import {Hamburger} from './Hamburger';

import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import {ThemeToggle} from './ThemeToggle';
import useDarkMode from 'use-dark-mode';
import {useEffect} from 'react';
import {Profile} from './Profile';
import {Notification} from './Notification';

import {MdAccountCircle} from 'react-icons/md';
import {RiBarChartFill} from 'react-icons/ri';
import {BiTimeFive} from 'react-icons/bi';
import {RiNewspaperLine} from 'react-icons/ri';
import {MdNotificationsNone} from 'react-icons/md';
import {MdSettings} from 'react-icons/md';
import {MdOutlineLogout} from 'react-icons/md';

const Header = ({open, handleClick}) => {
  return (
    <header
      className={cx(
        css`
          position: fixed;
          z-index: 3;
          top: 0;
          width: 100%;
          min-height: 3rem;
        `,
        'flex items-center relative bg-white',
        `dark:bg-slate-700 dark:text-white`
      )}
    >
      <Link to={'/'} className={`flex items-center gap-1`}>
        <img src={logo} alt={'logo'} className={`w-10`} />
        <h2 className="text-xl">Make YourSelf</h2>
      </Link>
      <Hamburger
        open={open}
        handleClick={handleClick}
        className={css`
          position: absolute;
          right: 1rem;
          z-index: 1;
          display: none;
          @media (max-width: 768px) {
            display: block;
          }
        `}
      />
      <div
        className={cx(
          css`
            min-height: 3rem;
            @media (max-width: 768px) {
              display: none;
            }
          `,
          `flex items-center gap-4 absolute top-0 right-4`
        )}
      >
        <ThemeToggle />
        <Notification
          menuData={[
            {
              id: 0,
              name: `Analytics`,
              pathname: `/analytics`,
              icon: () => {
                return <RiBarChartFill size={24} />;
              },
            },
            {
              id: 1,
              name: `Moments`,
              pathname: `/moment`,
              icon: () => {
                return <BiTimeFive size={24} />;
              },
            },
            {
              id: 2,
              name: `Newsletters`,
              pathname: `/newsletters`,
              icon: () => {
                return <RiNewspaperLine size={24} />;
              },
            },
          ]}
        />
        <Profile
          menuData={[
            {
              id: 0,
              name: `Settings`,
              pathname: `/settings`,
              icon: () => {
                return <MdSettings size={24} />;
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
    </header>
  );
};

export {Header};
