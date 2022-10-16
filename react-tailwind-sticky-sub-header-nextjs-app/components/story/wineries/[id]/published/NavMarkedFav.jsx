import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo, useEffect, useState} from 'react';

import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';

const NavMarkedFav = () => {
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
        `${favoriteWineryStories.length === 0 ? 'opacity-0' : 'opacity-100'}`
      )}
    >
      {favoriteWineryStories.length}
    </motion.span>
  );
};
export default memo(NavMarkedFav);
