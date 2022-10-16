import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useRecoilValue} from 'recoil';

import Map from '../Map';

import MapMultiLocation from '@/components/MapMultiLocation';
import Nav from '@/components/wineries/Nav';
import SidebarSp from '@/components/wineries/SidebarSp';
import hamburgerState from '@/stores/hamburgerStore';
import multiLocationSelectorState from '@/stores/multiLocationSelectorStore';

const Sidebar = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {activeWineryName, activeLocationNameList} = useRecoilValue(
    multiLocationSelectorState
  );
  return (
    <>
      <SidebarSp />
      <motion.aside
        className={cx(
          css`
            position: fixed;
            top: 0;
            left: 0;
            max-width: 18rem;
            width: 100%;
            display: block;
            height: 100vh;
            overflow: hidden;
            overflow-y: auto;
            z-index: 4;
            transition: left 0.2s ease ${opened ? 0 : 250}ms,
              max-width 0.2s ease ${opened ? 0 : 250}ms;
            @media (max-width: 768px) {
              max-width: 0;
              border: none;
              display: none;
            }
          `,
          `scrollbar-none`,
          `bg-white dark:bg-slate-700 dark:text-white`,
          `border-r-2`
        )}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -60,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeInOut',
          }}
          className={cx(
            css`
              position: sticky;
              top: 0;
              left: 0;
              width: 100%;
              min-height: 3rem;
              z-index: 1;
            `,
            `flex items-center gap-2 border-b-2 bg-white dark:bg-slate-700`
          )}
        >
          <div
            className={`flex items-center gap-1 hover:cursor-pointer`}
            onClick={(e) => {
              router.push({
                pathname: '/',
              });
            }}
          >
            <picture className={css``}>
              <source srcSet={`/assets/logo.png`} type={`image/png`} />
              <img
                src={'/assets/logo.png'}
                alt={'logo'}
                width={40}
                height={40}
              />
            </picture>
            <h2 className="text-xl">Make YourSelf</h2>
          </div>
        </motion.div>
        <h2
          className={cx(
            `text-lg flex items-center justify-start gap-1 border-b-2 mb-2 px-2`,
            css`
              min-height: 3rem;
            `
          )}
        >
          <MdOutlineLocationOn size={24} />
          Map
        </h2>
        {activeLocationNameList.length === 0 ? (
          <Map
            defaultZoom={9}
            className={css`
              @media (max-width: 1000px) {
              }
            `}
          />
        ) : (
          <MapMultiLocation
            defaultZoom={9}
            className={css`
              @media (max-width: 1000px) {
              }
            `}
          />
        )}
        <Nav />
      </motion.aside>
    </>
  );
};

export default Sidebar;
