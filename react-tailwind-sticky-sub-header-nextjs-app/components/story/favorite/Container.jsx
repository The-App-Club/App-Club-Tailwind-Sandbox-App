import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {motion} from 'framer-motion';

import GalleryItem from '@/components/story/favorite/GalleryItem';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';
import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {useRouter} from 'next/router';

const Container = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {favoriteWineStories} = useFavoriteWineStory();
  const {favoriteWineryStories} = useFavoriteWineryStory();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <div className="w-full flex items-center gap-2">
      <div
        className={cx(
          `w-full flex flex-col items-center justify-center min-h-[20rem] border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`
        )}
        onClick={(e) => {
          router.push({
            pathname: `/story/favorite/wines`,
          });
        }}
      >
        <h3 className="text-xl">Favorite Wine Story</h3>
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
          `w-full flex flex-col items-center justify-center min-h-[20rem] border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`
        )}
        onClick={(e) => {
          router.push({
            pathname: `/story/favorite/wineries`,
          });
        }}
      >
        <h3 className="text-xl">Favorite Winery Story</h3>
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
