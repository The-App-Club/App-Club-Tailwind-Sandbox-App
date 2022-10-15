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
import {BsPencilSquare} from 'react-icons/bs';
import wineState from '@/stores/wineStore';

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
  const {activeWine} = useRecoilValue(wineState);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);
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
          path={`/story/${activeWine.id}/published`}
          menuTitle={'Published Story'}
          icon={() => {
            return <MdOutlineHistory size={24} />;
          }}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;
