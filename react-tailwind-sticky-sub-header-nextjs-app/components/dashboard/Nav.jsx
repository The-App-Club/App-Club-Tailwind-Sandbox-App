import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {AiOutlineSelect} from 'react-icons/ai';
import {BiHome} from 'react-icons/bi';
import {FaHatCowboySide} from 'react-icons/fa';
import {FiSettings} from 'react-icons/fi';
import {GiGrapes, GiPriceTag, GiWineBottle} from 'react-icons/gi';
import {
  MdFavoriteBorder,
  MdOutlineContactMail,
  MdOutlineLocationOn,
  MdOutlineNotificationsNone,
  MdOutlineShoppingCart,
  MdRssFeed,
} from 'react-icons/md';
import {SiBuymeacoffee} from 'react-icons/si';
import {useRecoilState} from 'recoil';

import NavMarkedCart from '@/components/dashboard/NavMarkedCart';
import {default as NavMarkedWineFav} from '@/components/dashboard/NavMarkedFav';
import {default as NavMarkedStoryFav} from '@/components/story/NavMarkedFav';
import sidebarState from '@/stores/sidebarStore';
import {RiDashboardLine} from 'react-icons/ri';

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
          path={'/dashboard'}
          menuTitle={'Dashboard'}
          icon={() => {
            return <RiDashboardLine size={24} />;
          }}
        />
        <MenuItem
          path={'/dashboard/notification'}
          menuTitle={'Notification'}
          icon={() => {
            return <MdOutlineNotificationsNone size={24} />;
          }}
        />
        <MenuItem
          path={'/dashboard/setting'}
          menuTitle={'Setting'}
          icon={() => {
            return <FiSettings size={24} />;
          }}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;