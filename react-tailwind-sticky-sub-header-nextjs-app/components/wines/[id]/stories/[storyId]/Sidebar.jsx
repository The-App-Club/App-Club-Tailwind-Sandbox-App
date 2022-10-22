import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';

import Nav from '@/components/wines/[id]/stories/[storyId]/Nav';
import SidebarSp from '@/components/wines/[id]/stories/[storyId]/SidebarSp';
import hamburgerState from '@/stores/hamburgerStore';
import {useEffect, useMemo, useState} from 'react';
import dataWines from '@/data/wines.json';
import SidebarProduct from '@/components/wines/[id]/stories/[storyId]/SidebarProduct';

const Sidebar = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);

  const [isClient, setIsClient] = useState(false);
  const {id} = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const activeWine = useMemo(() => {
    return dataWines.find((d) => {
      return d.id === Number(id);
    });
  }, [id]);

  if (!activeWine) {
    return;
  }

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
        {isClient && <SidebarProduct item={activeWine} />}
        <Nav />
      </motion.aside>
    </>
  );
};

export default Sidebar;
