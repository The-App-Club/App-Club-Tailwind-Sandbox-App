import {useEffect, useRef} from 'react';
import gsap, {Power3} from 'gsap';
import {css, cx} from '@emotion/css';
import {Link, useNavigate} from 'react-router-dom';

import {FaHatCowboySide} from 'react-icons/fa';
import {RiAccountCircleLine} from 'react-icons/ri';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {MdOutlineLocalPolice} from 'react-icons/md';
import {GiChestnutLeaf} from 'react-icons/gi';

import {Hamburger} from './Hamburger';
import {NavMenu} from './NavMenu';
import {useClickOutside} from '../hooks/useClickOutside';

import logo from '../assets/logo.png';

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
        duration: 0.4,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    } else {
      document.body.classList.add('loading');
      gsap.to(navContainerDomRef.current, {
        x: `0%`,
        duration: 0.4,
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
        `overflow-hidden overflow-y-auto scrollbar-none bg-white`,
        `w-full h-full`,
        `flex justify-start items-start flex-col border-l-2`
      )}
    >
      <div className="relative w-full h-full">
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
          <NavMenu
            path={'/'}
            menuTitle={'Home'}
            icon={() => {
              return <FaHatCowboySide size={24} />;
            }}
          />
          <NavMenu
            path={'/membership'}
            menuTitle={'MemberShip'}
            icon={() => {
              return <RiAccountCircleLine size={24} />;
            }}
          />
          <NavMenu
            path={'/qa'}
            menuTitle={'QA'}
            icon={() => {
              return <AiOutlineQuestionCircle size={24} />;
            }}
          />
          <NavMenu
            path={'/polycy'}
            menuTitle={'Polycy'}
            icon={() => {
              return <MdOutlineLocalPolice size={24} />;
            }}
          />
          <NavMenu
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
