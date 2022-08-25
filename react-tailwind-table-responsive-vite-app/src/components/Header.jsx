import {css, cx} from '@emotion/css';
import {Link} from 'react-router-dom';
import 'hamburgers/dist/hamburgers.css';

import logo from '../assets/logo.png';

import {MdAccountCircle} from 'react-icons/md';
import {RiBarChartFill} from 'react-icons/ri';
import {BiTimeFive} from 'react-icons/bi';
import {RiNewspaperLine} from 'react-icons/ri';
import {MdNotificationsNone} from 'react-icons/md';
import {MdSettings} from 'react-icons/md';
import {MdOutlineLogout} from 'react-icons/md';

import {Hamburger} from './Hamburger';
import {Profile} from './Profile';
import {Notification} from './Notification';

const Header = ({opened, handleClick}) => {
  return (
    <header
      className={cx(
        css`
          min-height: 3rem;
          z-index: 3;
        `,
        'fixed top-0 w-full flex items-center gap-3 bg-white'
      )}
    >
      <Hamburger opened={opened} handleClick={handleClick} className={`pl-2`} />
      <Link to={'/'} className={`flex items-center gap-1`}>
        <img src={logo} alt={`logo`} className={`w-10`} />
        <h2 className="text-lg">Make Yourself</h2>
      </Link>
      <div
        className={css`
          min-height: 3rem;
          position: absolute;
          top: 0;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        `}
      >
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
