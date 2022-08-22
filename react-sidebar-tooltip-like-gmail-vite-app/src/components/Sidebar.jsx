import {css, cx} from '@emotion/css';
import {motion, useAnimationControls} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';
import {FaHatCowboySide} from 'react-icons/fa';
import {MdContactMail} from 'react-icons/md';
import {TbCup} from 'react-icons/tb';
import {useClickOutside} from '../hooks/useClickOutside';
import {useEffect, useRef} from 'react';
import gsap, {Power3} from 'gsap';
import {Hamburger} from './Hamburger';

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
        duration: 0.6,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    } else {
      gsap.to(navContainerDomRef.current, {
        maxWidth: 48,
        duration: 0.6,
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
          transition: max-width 0.6s ease;
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
      <nav
        className={cx(
          css`
            width: 100%;
            height: 100%;
            border-right: 1px solid darkgrey;
          `
        )}
      >
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
          <li
            onClick={(e) => {
              navigate('/', {
                state: {},
              });
            }}
          >
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <FaHome size={32} />
            </div>
            <h4>Home</h4>
          </li>
          <li
            onClick={(e) => {
              navigate('/about', {
                state: {},
              });
            }}
          >
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <FaHatCowboySide size={32} />
            </div>
            <h4>About</h4>
          </li>
          <li
            onClick={(e) => {
              navigate('/contact', {
                state: {},
              });
            }}
          >
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <MdContactMail size={32} />
            </div>
            <h4>Contact</h4>
          </li>
          <li
            onClick={(e) => {
              navigate('/work', {
                state: {},
              });
            }}
          >
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <TbCup size={32} />
            </div>
            <h4>Work</h4>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export {Sidebar};
