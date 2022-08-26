import {css, cx} from '@emotion/css';
import {Hamburger} from './Hamburger';

import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
import {ThemeToggle} from './ThemeToggle';
import useDarkMode from 'use-dark-mode';
import {useEffect} from 'react';

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
      <Link to={'/'} className={`flex items-center gap-2 `}>
        <img src={logo} alt={'logo'} className={`w-10`} />
        <h2 className="text-xl">Make YourSelf</h2>
      </Link>
      {/* <ThemeToggle /> */}
      <Hamburger
        open={open}
        handleClick={handleClick}
        className={css`
          position: absolute;
          right: 1rem;
          z-index: 1;
        `}
      />
    </header>
  );
};

export {Header};
