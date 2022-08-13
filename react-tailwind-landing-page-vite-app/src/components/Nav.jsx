import {Link, useNavigate} from 'react-router-dom';
import {css, cx} from '@emotion/css';
import {
  slide as Menu,
  bubble,
  elastic,
  reveal,
  scaleRotate,
  stack,
  fallDown,
  push,
  pushRotate,
  scaleDown,
} from 'react-burger-menu';
import {useEffect, useState} from 'react';

import {AiOutlineHome} from 'react-icons/ai';
import {BsMusicPlayer} from 'react-icons/bs';
import {BsQuestionCircle} from 'react-icons/bs';
import {IoMdBusiness} from 'react-icons/io';
import {GiHumanTarget} from 'react-icons/gi';
import {MdOutlineFeaturedPlayList} from 'react-icons/md';
import {AiOutlineMail} from 'react-icons/ai';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {AiOutlinePayCircle} from 'react-icons/ai';

const NavItem = ({children, to}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          min-height: 3rem;
          min-width: 6rem;
        `,
        'flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer'
      )}
      onClick={(e) => {
        navigate(to, {
          state: {},
        });
      }}
    >
      {children}
    </li>
  );
};

const Nav = ({tik, isRight = false, outerContainerDomRef}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen((open) => {
      if (open) {
        return false;
      }
      return open;
    });
  }, [tik]);

  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        min-height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 768px) {
          display: block;
          justify-content: initial;
          align-items: initial;
        }
        //
        // Burger menu custom styles
        //
        .bm-burger-button {
          position: absolute;
          width: 36px;
          height: 30px;
          top: 8px;
          left: ${isRight ? 'initial' : '8px'};
          right: ${isRight ? '8px' : 'initial'};
          display: none;
          :hover {
            background: #f1f1f1;
          }
          @media (max-width: 768px) {
            display: block;
          }
        }
        // Outline for burger button focus state
        .bm-burger-button button:focus {
          /* outline: 2px solid #c94e50; */
          /* outline-offset: 8px; */
        }
        // Background color for burger bars focus state
        .bm-burger-button {
          button:focus + span {
            span.bm-burger-bars {
              /* background-color: #c94e50; */
            }
          }
        }
        .right .bm-burger-button {
          left: initial;
          right: 36px;
        }
        .bm-burger-bars {
          background: #000;
        }
        .bm-morph-shape {
          fill: #f1f1f1;
        }
        .bm-menu {
          background: #f6f6f6;
          a {
            color: #000;
            &:hover {
              background: #f1f1f1;
              font-weight: bold;
            }
          }
        }
        .bm-item-list a {
          padding: 0.5rem;
        }
        .bm-item {
          :focus {
            outline: none;
          }
          :hover {
            border-left: 3px solid #000;
          }
        }
      `}
    >
      <nav
        className={css`
          /* position: absolute;
          top: 0;
          right: 8px; */
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <ul
          className={cx(
            css``,
            `list-none flex justify-center items-center gap-5`
          )}
        >
          <NavItem to={'/service'}>
            <Link to={'/service'}>Service</Link>
          </NavItem>
          <NavItem to={'/features'}>
            <Link to={'/features'}>Features</Link>
          </NavItem>
          <NavItem to={'/artists'}>
            <Link to={'/artists'}>Artists</Link>
          </NavItem>
          <NavItem to={'/pricing'}>
            <Link to={'/pricing'}>Pricing</Link>
          </NavItem>
        </ul>
      </nav>
      <Menu
        isOpen={open}
        onStateChange={(e) => {
          const outerContainerDom = outerContainerDomRef.current;
          if (e.isOpen) {
            outerContainerDom.classList.add('nav-active');
          } else {
            outerContainerDom.classList.remove('nav-active');
          }
          setOpen(e.isOpen);
        }}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        right={isRight}
      >
        <Link
          to={'/'}
          className={cx(
            css`
              display: flex !important;
            `,
            `text-base flex items-center gap-1`
          )}
        >
          <AiOutlineHome size={24} />
          <span>Home</span>
        </Link>
        <Link
          to={'/service'}
          className={cx(
            css`
              display: flex !important;
            `,
            `text-base flex items-center gap-1`
          )}
        >
          <BsMusicPlayer size={24} />
          <span>Service</span>
        </Link>
        <Link
          to={'/features'}
          className={cx(
            css`
              display: flex !important;
            `,
            `text-base flex items-center gap-1`
          )}
        >
          {' '}
          <MdOutlineFeaturedPlayList size={24} />
          <span>Features</span>
        </Link>
        <Link
          to={'/artists'}
          className={cx(
            css`
              display: flex !important;
            `,
            `text-base flex items-center gap-1`
          )}
        >
          {' '}
          <GiHumanTarget size={24} />
          <span>Artists</span>
        </Link>
        <Link
          to={'/pricing'}
          className={cx(
            css`
              display: flex !important;
            `,
            `text-base flex items-center gap-1`
          )}
        >
          <AiOutlinePayCircle size={24} />
          <span>Pricing</span>
        </Link>
      </Menu>
    </div>
  );
};

export {Nav};
