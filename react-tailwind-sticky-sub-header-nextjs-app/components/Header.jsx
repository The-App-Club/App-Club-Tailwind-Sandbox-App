import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {FaHatCowboySide} from 'react-icons/fa';
import {FiSettings} from 'react-icons/fi';
import {MdOutlineLogout, MdOutlineShoppingCart} from 'react-icons/md';

import Hamburger from '@/components/Hamburger';
import Profile from '@/components/Profile';
import ThemeToggle from '@/components/ThemeToggle';
import useCart from '@/hooks/useCart';

const Header = ({pathname}) => {
  const [isClient, setIsClient] = useState(false);
  const {carts} = useCart();
  const router = useRouter();
  const nicePosition = useMemo(() => {
    if (pathname === `/wines/[id]/comment`) {
      return css`
        display: none;
      `;
    }
    if (
      pathname === `/` ||
      pathname === `/subscribe` ||
      pathname === `/contact` ||
      pathname === `/feed` ||
      pathname === `/favorite` ||
      pathname === `/favorite/wines` ||
      pathname === `/favorite/wineries` ||
      pathname === `/notification` ||
      pathname === `/cart` ||
      pathname === `/location` ||
      pathname === `/about` ||
      pathname === `/price` ||
      pathname === `/wineries` ||
      pathname === `/wineries/[id]` ||
      pathname === `/wineries/[id]/stories` ||
      pathname === `/wineries/[id]/stories/[storyId]` ||
      pathname === `/wineries/[id]/stories/[storyId]/chapters` ||
      pathname === `/wineries/[id]/stories/[storyId]/chapters/[chapterId]` ||
      pathname === `/story` ||
      pathname === `/story/wines` ||
      pathname === `/story/wineries` ||
      pathname === `/story/favorite` ||
      pathname === `/story/favorite/wines` ||
      pathname === `/story/favorite/wineries` ||
      pathname === `/story/wineries/[id]` ||
      pathname === `/story/wineries/[id]/create` ||
      pathname === `/story/wineries/[id]/edit` ||
      pathname === `/story/wineries/[id]/published` ||
      pathname === `/story/wineries/[id]/published/[pid]` ||
      pathname === `/story/wines/[id]` ||
      pathname === `/story/wines/[id]/create` ||
      pathname === `/story/wines/[id]/edit` ||
      pathname === `/story/wines/[id]/published` ||
      pathname === `/story/wines/[id]/published/[pid]` ||
      pathname === `/wines` ||
      pathname === `/wines/[id]` ||
      pathname === `/wines/[id]/story` ||
      pathname === `/wines/[id]/stories` ||
      pathname === `/wines/[id]/stories/[storyId]` ||
      pathname === `/wines/[id]/stories/[storyId]/chapters` ||
      pathname === `/wines/[id]/stories/[storyId]/chapters/[chapterId]`
    ) {
      return css`
        left: 18rem;
        max-width: calc(100% - 18rem);
      `;
    }
    return css`
      left: 0rem;
      max-width: calc(100% - 0rem);
    `;
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
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
          width: 100%;
          min-height: 3rem;
          transition: left 0.2s ease 250ms, max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
        `,
        nicePosition,
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
          {/* <div
            className="w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={(e) => {
              router.push({
                pathname: '/notification',
              });
            }}
          >
            <MdOutlineNotificationsNone size={24} />
          </div> */}
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
