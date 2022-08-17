import {useEffect, useRef} from 'react';
import {useClickOutside} from '../hooks/useClickOutside';
import styled from '@emotion/styled';
import gsap, {Power3} from 'gsap';
import {css, cx} from '@emotion/css';
import {Link, useNavigate} from 'react-router-dom';
import {Hamburger} from './Hamburger';

import logo from '../assets/logo.png';

const MenuItem = ({path, menuTitle}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 1rem;
        `,
        'hover:bg-gray-100 hover:cursor-pointer'
      )}
      onClick={(e) => {
        navigate(path, {
          state: {},
        });
      }}
    >
      <Link to={'/'}>{menuTitle}</Link>
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
        `flex justify-start items-start flex-col`
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
          <MenuItem path={'/'} menuTitle={'Home'} />
          <MenuItem path={'/adsense'} menuTitle={'Ads'} />
        </ul>
      </div>
    </nav>
  );
};

export {Nav};
