import {css, cx} from '@emotion/css';
import {motion, useAnimationControls} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';
import {FaHatCowboySide} from 'react-icons/fa';
import {MdContactMail} from 'react-icons/md';
import {TbCup} from 'react-icons/tb';
import {useClickOutside} from '../hooks/useClickOutside';
import {useEffect, useRef} from 'react';
import gsap, {Power3} from 'gsap';
import {Hamburger} from './Hamburger';

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

const SidebarMenu = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2`,
        `border-r-2 border-transparent`,
        `hover:border-r-2 hover:border-blue-900 hover:bg-gray-100 hover:cursor-pointer`
      )}
      onClick={(e) => {
        navigate(path, {
          state: {},
        });
      }}
    >
      <div className="flex items-center gap-2 py-2 pr-2">
        {icon()}
        <h4>{menuTitle}</h4>
      </div>
    </li>
  );
};

const Sidebar = ({opened, setOpened, isTrigger, setIsTrigger, handleClick}) => {
  const navigate = useNavigate();
  const navContainerDomRef = useRef();
  const controls = useAnimationControls();

  useClickOutside(navContainerDomRef, (e) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    if (!isTrigger) {
      setOpened(false);
    }
  });
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    if (opened) {
      gsap.to(navContainerDomRef.current, {
        maxWidth: 200,
        duration: 0.4,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    } else {
      gsap.to(navContainerDomRef.current, {
        maxWidth: 48,
        duration: 0.4,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    }
  }, [opened]);

  return (
    <aside
      ref={navContainerDomRef}
      className={cx(
        css`
          overflow: hidden;
          width: 100%;
          height: calc(100vh - 3rem);
          /* transition: max-width 0.6s ease; */
          &.open {
            max-width: 200px;
          }
          &.close {
            max-width: 48px;
          },
        `,
        `${opened ? 'open' : 'close'}`,
        css`
          display: block;
          @media (max-width: 768px) {
            display: none;
          }
        `
      )}
    >
      <nav className={cx(`w-full h-full border-r-2`)}>
        <ul
          className={cx(
            css`
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              li:not(.menu-toggle) {
                display: flex;
                align-items: center;
                padding: 0 0.5rem;
                gap: 0.5rem;
                min-height: 2rem;
                width: 100%;
                :hover {
                  cursor: pointer;
                  background: #f7f7f7;
                }
              }
            `
          )}
        >
          <li
            className={cx(
              'menu-toggle',
              css`
                width: 100%;
                padding: 0 0.5rem;
              `
            )}
          >
            <Hamburger
              open={opened}
              handleClick={handleClick}
              className={css``}
            />
          </li>
          <SidebarMenu
            path={'/'}
            menuTitle={'Home'}
            icon={() => {
              return <FaHatCowboySide size={32} />;
            }}
          />
          <SidebarMenu
            path={'/membership'}
            menuTitle={'MemberShip'}
            icon={() => {
              return <RiAccountCircleLine size={32} />;
            }}
          />
          <SidebarMenu
            path={'/qa'}
            menuTitle={'QA'}
            icon={() => {
              return <AiOutlineQuestionCircle size={32} />;
            }}
          />
          <SidebarMenu
            path={'/polycy'}
            menuTitle={'Polycy'}
            icon={() => {
              return <MdOutlineLocalPolice size={32} />;
            }}
          />
          <SidebarMenu
            path={'/allergen'}
            menuTitle={'Allergen'}
            icon={() => {
              return <GiChestnutLeaf size={32} />;
            }}
          />
        </ul>
      </nav>
    </aside>
  );
};

export {Sidebar};
