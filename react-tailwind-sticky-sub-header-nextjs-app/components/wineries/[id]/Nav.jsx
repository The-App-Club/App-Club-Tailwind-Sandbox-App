import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {
  MdFavoriteBorder,
  MdHistory,
  MdOutlineShoppingCart,
  MdRssFeed,
} from 'react-icons/md';
import {useRecoilState} from 'recoil';

import NavMarkedFavWinery from '@/components/wineries/[id]/NavMarkedFavWinery';
import NavMarkedFavWine from '@/components/wineries/[id]/NavMarkedFavWine';
import sidebarState from '@/stores/sidebarStore';
import {BsPencilSquare} from 'react-icons/bs';

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
    if (menuTitle === `Favorite Winery`) {
      return <NavMarkedFavWinery />;
    }
    if (menuTitle === `Favorite Wine`) {
      return <NavMarkedFavWine />;
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
  const router = useRouter();
  const {id} = router.query;
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
          path={`/wineries/${id}`}
          menuTitle={'Winery'}
          icon={() => {
            return <GiGrapes size={24} />;
          }}
        />
        <MenuItem
          path={'/favorite/wineries'}
          menuTitle={'Favorite Winery'}
          icon={() => {
            return <MdFavoriteBorder size={24} />;
          }}
        />
        <MenuItem
          path={'/favorite/wines'}
          menuTitle={'Favorite Wine'}
          icon={() => {
            return <MdFavoriteBorder size={24} />;
          }}
        />
        <MenuItem
          path={`/wineries/${id}/stories`}
          menuTitle={'Winery Story'}
          icon={() => {
            return <MdHistory size={24} />;
          }}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;