import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import hamburgerState from '../stores/hamburgerStore';
import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const router = useRouter();
  return (
    <header
      className={cx(
        css`
          position: fixed;
          z-index: 1;
          top: 0;
          width: 100%;
          min-height: 3rem;
        `,
        'flex items-center bg-white',
        `dark:bg-slate-700 dark:text-white`
      )}
    >
      <div className="relative w-full flex items-center">
        <div
          className={`flex items-center gap-1 hover:cursor-pointer`}
          onClick={(e) => {
            router.push({
              pathname: '/',
            });
          }}
        >
          <picture className={css``}>
            <source srcSet={`/assets/logo.png`} type={`image/png`} />
            <img src={'/assets/logo.png'} alt={'logo'} width={40} height={40} />
          </picture>
          <h2 className="text-xl">Make YourSelf</h2>
        </div>
        <div className="absolute right-2 flex items-center gap-2">
          <ThemeToggle />
          <Hamburger />
        </div>
      </div>
    </header>
  );
};

export default Header;
