import {css, cx} from '@emotion/css';
import {useNavigate} from 'react-router-dom';
import {FaHatCowboySide} from 'react-icons/fa';
import {useClickOutside} from '../hooks/useClickOutside';
import {useEffect, useRef} from 'react';
import gsap, {Power3} from 'gsap';
import {Hamburger} from './Hamburger';

import {RiAccountCircleLine} from 'react-icons/ri';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {MdOutlineLocalPolice} from 'react-icons/md';
import {GiChestnutLeaf} from 'react-icons/gi';

import {SidebarMenu} from './SidebarMenu';

const Sidebar = ({opened, setOpened, isTrigger, setIsTrigger, handleClick}) => {
  const navContainerDomRef = useRef();

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
          height: 100vh;
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
        <ul className={cx(`w-full flex justify-center items-center flex-col`)}>
          <li className={cx('menu-toggle', `w-full px-2`)}>
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
