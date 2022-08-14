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
import {useNavOpenState} from '../hooks/useNavOpenState';

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

  const {opened, setNavOpened} = useNavOpenState((state) => {
    return {
      opened: state.opened,
      setNavOpened: state.setNavOpened,
    };
  });

  useEffect(() => {
    setNavOpened({opened: open});
  }, [open]);

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
        @media (max-width: 900px) {
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
          @media (max-width: 900px) {
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
          span {
            margin-left: 10px;
            font-weight: 700;
          }
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
          @media (max-width: 900px) {
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
          <NavItem to={'/about'}>
            <Link to={'/about'}>About</Link>
          </NavItem>
          <NavItem to={'/contact'}>
            <Link to={'/contact'}>Contact</Link>
          </NavItem>
          <NavItem to={'/price'}>
            <Link to={'/price'}>Price</Link>
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
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/contact'}>Contact</Link>
        <Link to={'/price'}>Price</Link>
      </Menu>
    </div>
  );
};

export {Nav};
