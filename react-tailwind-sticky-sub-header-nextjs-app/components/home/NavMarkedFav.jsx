import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo, useEffect, useState} from 'react';

import useFavoriteWine from '@/hooks/useFavoriteWine';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';
import useFavoriteWinery from '@/hooks/useFavoriteWinery';
import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';

const NavMarkedFav = () => {
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
    <motion.span
      className={cx(
        'absolute right-2 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
        `${
          favoriteWines.length === 0 &&
          favoriteWineries.length === 0 &&
          favoriteWineStories.length === 0 &&
          favoriteWineryStories.length === 0
            ? 'opacity-0'
            : 'opacity-100'
        }`
      )}
    >
      {favoriteWines.length +
        favoriteWineries.length +
        favoriteWineStories.length +
        favoriteWineryStories.length}
    </motion.span>
  );
};
export default memo(NavMarkedFav);
