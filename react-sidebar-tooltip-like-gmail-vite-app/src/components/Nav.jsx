import {useEffect, useRef} from 'react';
import {useClickOutside} from '../hooks/useClickOutside';
import styled from '@emotion/styled';
import gsap, {Power3} from 'gsap';
import {css, cx} from '@emotion/css';
import {Link, useNavigate} from 'react-router-dom';
import {Hamburger} from './Hamburger';

import {FaHatCowboySide} from 'react-icons/fa';
import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineChat} from 'react-icons/md';
import {GrBeacon} from 'react-icons/gr';
import {RiAdvertisementLine} from 'react-icons/ri';

import {RiAccountCircleLine} from 'react-icons/ri';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {MdOutlineLocalPolice} from 'react-icons/md';
import {GiChestnutLeaf} from 'react-icons/gi';

import logo from '../assets/logo.png';

const MenuItem = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2`,
        `border-l-2 border-transparent`,
        `hover:border-l-2 hover:border-blue-900 hover:bg-gray-100 hover:cursor-pointer`
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
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    if (!isTrigger) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
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
          z-index: 103;
          transform: translate(100%, 0%);
          max-width: 22rem;
          @media (max-width: 768px) {
            max-width: 16rem;
          }
        `,
        `fixed top-0 right-0 min-h-screen`,
        `overflow-hidden overflow-y-auto scrollbar-none bg-gray-50`,
        `w-full h-full`,
        `flex justify-start items-start flex-col border-l-2`
      )}
    >
      <div className="relative w-full">
        <div
          className={cx(
            css`
              position: relative;
              width: 100%;
              min-height: 3rem;
            `,
            `flex justify-between items-center gap-2 border-b-2`
          )}
        >
          <div className="flex items-center">
            <img src={logo} alt={'logo'} className={`w-10`} />
            <h3 className="text-2xl">Menu</h3>
          </div>
          <Hamburger
            open={open}
            handleClick={handleClick}
            className={css`
              margin-right: 0.5rem;
            `}
          />
        </div>
        <ul
          className={css`
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
              return <FaHatCowboySide size={24} />;
            }}
          />
          <MenuItem
            path={'/membership'}
            menuTitle={'MemberShip'}
            icon={() => {
              return <RiAccountCircleLine size={24} />;
            }}
          />
          <MenuItem
            path={'/qa'}
            menuTitle={'QA'}
            icon={() => {
              return <AiOutlineQuestionCircle size={24} />;
            }}
          />
          <MenuItem
            path={'/polycy'}
            menuTitle={'Polycy'}
            icon={() => {
              return <MdOutlineLocalPolice size={24} />;
            }}
          />
          <MenuItem
            path={'/allergen'}
            menuTitle={'Allergen'}
            icon={() => {
              return <GiChestnutLeaf size={24} />;
            }}
          />
        </ul>
      </div>
    </nav>
  );
};

export {Nav};
