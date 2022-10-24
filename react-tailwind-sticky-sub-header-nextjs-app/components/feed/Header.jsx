import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {FaHatCowboySide} from 'react-icons/fa';
import {FiSettings} from 'react-icons/fi';
import {MdOutlineLogout, MdOutlineShoppingCart} from 'react-icons/md';
import {gsap} from 'gsap';
import {Observer} from 'gsap/dist/Observer';

import Hamburger from '@/components/Hamburger';
import Profile from '@/components/Profile';
import ThemeToggle from '@/components/ThemeToggle';
import useCart from '@/hooks/useCart';

gsap.registerPlugin(Observer);

const Header = () => {
  const headerDomRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const {carts} = useCart();
  const router = useRouter();
  useEffect(() => {
    // https://codepen.io/Mamboleoo/pen/poLEKob
    if (typeof window !== 'undefined') {
      setIsClient(true);
      const headerDom = headerDomRef.current;
      Observer.create({
        target: window,
        type: 'scroll',
        tolerance: 50,
        onUp: () => {
          headerDom.classList.remove('is-hidden');
        },
        onDown: () => {
          headerDom.classList.add('is-hidden');
        },
      });
    }
  }, []);

  const renderCartItemCount = () => {
    if (carts.length !== 0) {
      return (
        <motion.span
          className={cx(
            'absolute -top-0.5 -right-2 w-6 h-6 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold text-sm',
            `${carts.length === 0 ? 'opacity-0' : 'opacity-100'}`
          )}
        >
          {carts.length}
        </motion.span>
      );
    }
    return null;
  };

  return (
    <motion.header
      ref={headerDomRef}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.7,
        ease: 'linear',
      }}
      className={cx(
        css`
          position: fixed;
          z-index: 4;
          top: 0;
          left: 18rem;
          max-width: calc(100% - 18rem);
          width: 100%;
          min-height: 3rem;
          transition: transform 0.4s ease, left 0.2s ease 250ms,
            max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
          &.is-hidden {
            transform: initial;
            @media (max-width: 768px) {
              transform: translateY(-100%);
            }
          }
        `,
        `px-2`,
        `flex items-center bg-white`,
        `dark:bg-slate-700 dark:text-white`,
        `border-b-2`
      )}
    >
      <div className="relative w-full flex items-center gap-2">
        <Hamburger
          className={css`
            display: none;
            opacity: 0;
            @media (max-width: 768px) {
              display: block;
              opacity: 1;
            }
          `}
        />
        <div className="absolute right-2 flex items-center gap-2">
          <ThemeToggle />
          <div
            className="relative w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={(e) => {
              router.push({
                pathname: '/cart',
              });
            }}
          >
            <MdOutlineShoppingCart size={24} />
            {isClient && renderCartItemCount()}
          </div>
          <div
            className="w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={(e) => {
              router.push({
                pathname: '/about',
              });
            }}
          >
            <FaHatCowboySide size={24} />
          </div>
          <Profile
            menuData={[
              {
                id: 0,
                name: `Setting`,
                pathname: `/setting`,
                icon: () => {
                  return <FiSettings size={24} />;
                },
              },
              {
                id: 1,
                name: `Logout`,
                pathname: `/logout`,
                icon: () => {
                  return <MdOutlineLogout size={24} />;
                },
              },
            ]}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
