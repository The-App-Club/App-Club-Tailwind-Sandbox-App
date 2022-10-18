import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {TbCircleDot} from 'react-icons/tb';
import {useRecoilState} from 'recoil';

import dataWineChapters from '@/data/wineChapters.json';
import sidebarState from '@/stores/sidebarStore';

const attachActiveMenu = ({activeChapterId, chapterId}) => {
  if (activeChapterId === chapterId) {
    return `border-blue-900 dark:border-yellow-300`;
  }
  return `border-transparent`;
};

const MenuItem = ({path, menuTitle, activeChapterId, chapterId, icon}) => {
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
        isClient && attachActiveMenu({activeChapterId, chapterId})
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
  const router = useRouter();
  const {id, storyId, chapterId} = router.query;
  const motionConfig = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.001,
      },
    },
  };
  const matchedStory = useMemo(() => {
    return dataWineChapters.find((item) => {
      return item.storyId === storyId;
    });
  }, [storyId]);

  const matchedChapters = useMemo(() => {
    if (!matchedStory) {
      return [];
    }
    return matchedStory.chapters;
  }, [matchedStory]);

  if (!matchedStory) {
    return;
  }

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
        {matchedChapters.map((chapter, index) => {
          return (
            <MenuItem
              key={index}
              path={`/wines/${id}/stories/${storyId}/chapters/${chapter.chapterId}`}
              menuTitle={`Chapter ${index + 1}`}
              activeChapterId={chapterId}
              chapterId={chapter.chapterId}
              icon={() => {
                return <TbCircleDot size={24} />;
              }}
            />
          );
        })}
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;
