import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';

import useFavoriteWine from '@/hooks/useFavoriteWine';
import useFavoriteWinery from '@/hooks/useFavoriteWinery';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';
import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';

const Container = () => {
  const router = useRouter();
  const {favoriteWines} = useFavoriteWine();
  const {favoriteWineries} = useFavoriteWinery();
  const {favoriteWineStories} = useFavoriteWineStory();
  const {favoriteWineryStories} = useFavoriteWineryStory();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);
  return (
    <div
      className={cx(
        `w-full`,
        css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        `
      )}
    >
      <div
        className={cx(
          `w-full flex flex-col items-center justify-center border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`,
          css`
            min-height: 20rem;
            @media (max-width: 768px) {
              min-height: 10rem;
            }
          `
        )}
        onClick={(e) => {
          router.push({
            pathname: `/favorite/wines`,
          });
        }}
      >
        <h3 className="text-xl">Wine</h3>
        <GiWineBottle size={64} />
        {isClient && (
          <motion.span
            className={cx(
              'w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
              `${favoriteWines.length === 0 ? 'opacity-0' : 'opacity-100'}`
            )}
          >
            {favoriteWines.length}
          </motion.span>
        )}
      </div>
      <div
        className={cx(
          `w-full flex flex-col items-center justify-center border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`,
          css`
            min-height: 20rem;
            @media (max-width: 768px) {
              min-height: 10rem;
            }
          `
        )}
        onClick={(e) => {
          router.push({
            pathname: `/favorite/wineries`,
          });
        }}
      >
        <h3 className="text-xl">Winery</h3>
        <GiGrapes size={64} />
        {isClient && (
          <motion.span
            className={cx(
              'w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
              `${favoriteWineries.length === 0 ? 'opacity-0' : 'opacity-100'}`
            )}
          >
            {favoriteWineries.length}
          </motion.span>
        )}
      </div>

      <div
        className={cx(
          `w-full flex flex-col items-center justify-center border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`,
          css`
            min-height: 20rem;
            @media (max-width: 768px) {
              min-height: 10rem;
            }
          `
        )}
        onClick={(e) => {
          router.push({
            pathname: `/story/favorite/wines`,
          });
        }}
      >
        <h3 className="text-xl">Wine Story</h3>
        <GiWineBottle size={64} />
        {isClient && (
          <motion.span
            className={cx(
              'w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
              `${
                favoriteWineStories.length === 0 ? 'opacity-0' : 'opacity-100'
              }`
            )}
          >
            {favoriteWineStories.length}
          </motion.span>
        )}
      </div>
      <div
        className={cx(
          `w-full flex flex-col items-center justify-center border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`,
          css`
            min-height: 20rem;
            @media (max-width: 768px) {
              min-height: 10rem;
            }
          `
        )}
        onClick={(e) => {
          router.push({
            pathname: `/story/favorite/wineries`,
          });
        }}
      >
        <h3 className="text-xl">Winery Story</h3>
        <GiGrapes size={64} />
        {isClient && (
          <motion.span
            className={cx(
              'w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
              `${
                favoriteWineryStories.length === 0 ? 'opacity-0' : 'opacity-100'
              }`
            )}
          >
            {favoriteWineryStories.length}
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default Container;
