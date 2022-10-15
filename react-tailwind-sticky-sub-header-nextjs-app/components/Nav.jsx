import {css, cx} from '@emotion/css';
import {
  MdOutlineNotificationsNone,
  MdOutlineShoppingCart,
  MdFavoriteBorder,
  MdOutlineHistory,
} from 'react-icons/md';
import {motion} from 'framer-motion';
import {useRecoilState, useRecoilValue} from 'recoil';
import themeState from '@/stores/themeStore';
import {useRouter} from 'next/router';
import sidebarState from '@/stores/sidebarStore';
import {useEffect, useState} from 'react';
import {FiSettings} from 'react-icons/fi';
import {MdOutlineLocationOn} from 'react-icons/md';

import {GiGrapes, GiPriceTag} from 'react-icons/gi';
import {GiWineBottle} from 'react-icons/gi';
import {BiHome} from 'react-icons/bi';
import {FaHatCowboySide} from 'react-icons/fa';
import {MdOutlineContactMail} from 'react-icons/md';
import {MdRssFeed} from 'react-icons/md';
import NavMarkedCart from '@/components/NavMarkedCart';
import {default as NavMarkedWineFav} from '@/components/NavMarkedFav';
import {default as NavMarkedStoryFav} from '@/components/story/NavMarkedFav';

const attachActiveMenu = ({activeMenuName, menuTitle}) => {
  if (activeMenuName === menuTitle) {
    return `border-blue-900 dark:border-yellow-300`;
  }
  return `border-transparent`;
};

const MenuItem = ({path, menuTitle, icon}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const motionConfig = {
    hidden: {opacity: 0, x: 160},
    show: {opacity: 1, x: 0},
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderShortHandMetrics = () => {
    if (menuTitle === `Favorite`) {
      return <NavMarkedWineFav />;
    }
    if (menuTitle === `Favorite Story`) {
      return <NavMarkedStoryFav />;
    }
    if (menuTitle === `Cart`) {
      return <NavMarkedCart />;
    }
    return null;
  };

  return (
    <motion.li
      variants={motionConfig}
      transition={{
        duration: 0.7,
        ease: 'backInOut',
      }}
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2 hover:cursor-pointer`,
        `relative`,
        `border-r-8`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`,
        isClient &&
          attachActiveMenu({activeMenuName: sidebar.activeMenuName, menuTitle})
      )}
      onClick={(e) => {
        setSidebar((prevState) => {
          return {
            activeMenuName: menuTitle,
          };
        });
        router.push({
          pathname: path,
        });
      }}
    >
      {icon()}
      <h2>{menuTitle}</h2>
      {isClient && renderShortHandMetrics()}
    </motion.li>
  );
};

const Nav = () => {
  const motionConfig = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.001,
      },
    },
  };
  return (
    <motion.nav className="relative w-full">
      <motion.ul
        variants={motionConfig}
        initial="hidden"
        animate="show"
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
            return <BiHome size={24} />;
          }}
        />
        <MenuItem
          path={'/location'}
          menuTitle={'Location'}
          icon={() => {
            return <MdOutlineLocationOn size={24} />;
          }}
        />
        <MenuItem
          path={'/wines'}
          menuTitle={'Wines'}
          icon={() => {
            return <GiWineBottle size={24} />;
          }}
        />
        <MenuItem
          path={'/winery'}
          menuTitle={'Winery'}
          icon={() => {
            return <GiGrapes size={24} />;
          }}
        />
        <MenuItem
          path={'/favorite'}
          menuTitle={'Favorite'}
          icon={() => {
            return <MdFavoriteBorder size={24} />;
          }}
        />
        <MenuItem
          path={'/feed'}
          menuTitle={'Feed'}
          icon={() => {
            return <MdRssFeed size={24} />;
          }}
        />
        <MenuItem
          path={'/cart'}
          menuTitle={'Cart'}
          icon={() => {
            return <MdOutlineShoppingCart size={24} />;
          }}
        />
        <MenuItem
          path={'/notification'}
          menuTitle={'Notification'}
          icon={() => {
            return <MdOutlineNotificationsNone size={24} />;
          }}
        />
        <MenuItem
          path={'/setting'}
          menuTitle={'Setting'}
          icon={() => {
            return <FiSettings size={24} />;
          }}
        />
        <MenuItem
          path={'/contact'}
          menuTitle={'Contact'}
          icon={() => {
            return <MdOutlineContactMail size={24} />;
          }}
        />
        <MenuItem
          path={'/about'}
          menuTitle={'About'}
          icon={() => {
            return <FaHatCowboySide size={24} />;
          }}
        />
        <MenuItem
          path={'/price'}
          menuTitle={'Price'}
          icon={() => {
            return <GiPriceTag size={24} />;
          }}
        />
        <MenuItem
          path={'/story'}
          menuTitle={'Story'}
          icon={() => {
            return <MdOutlineHistory size={24} />;
          }}
        />
        <MenuItem
          path={'/story/favorite'}
          menuTitle={'Favorite Story'}
          icon={() => {
            return <MdFavoriteBorder size={24} />;
          }}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;
