import {css, cx} from '@emotion/css';
import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {MdOutlineChat} from 'react-icons/md';
import {BiTimeFive} from 'react-icons/bi';
import {RiAdvertisementLine} from 'react-icons/ri';
import Link from 'next/link';
import {motion} from 'framer-motion';

import Hamburger from './Hamburger';
import {useRecoilState, useRecoilValue} from 'recoil';
import themeState from '../stores/themeStore';
import {useRouter} from 'next/router';
import sidebarState from '../stores/sidebarStore';

const decideBorderColor = ({theme}) => {
  if (theme.mode === `dark`) {
    return `hover:border-yellow-300`;
  }

  return `hover:border-blue-900`;
};

const MenuItem = ({path, menuTitle, icon}) => {
  const router = useRouter();
  const theme = useRecoilValue(themeState);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const motionConfig = {
    hidden: {opacity: 0, x: 160},
    show: {opacity: 1, x: 0},
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
        `border-r-8 border-transparent`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`,
        `${
          sidebar.activeMenuName === menuTitle
            ? 'border-blue-900 dark:border-yellow-300'
            : ''
        }`
        // decideBorderColor({theme})
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
      {/* <Link href={path}>
        <a>{menuTitle}</a>
      </Link> */}
    </motion.li>
  );
};

const Nav = () => {
  const motionConfig = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          padding-top: 0;
          @media (max-width: 768px) {
            padding-top: 3rem;
          }
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
            return <FiTwitter size={24} />;
          }}
        />
        <MenuItem
          path={'/about'}
          menuTitle={'About'}
          icon={() => {
            return <RiAdvertisementLine size={24} />;
          }}
        />
        <MenuItem
          path={'/contact'}
          menuTitle={'Contact'}
          icon={() => {
            return <MdOutlineChat size={24} />;
          }}
        />
        <MenuItem
          path={'/price'}
          menuTitle={'Price'}
          icon={() => {
            return <BiTimeFive size={24} />;
          }}
        />
        <MenuItem
          path={'/notification'}
          menuTitle={'Notification'}
          icon={() => {
            return <MdOutlineNotifications size={24} />;
          }}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;
