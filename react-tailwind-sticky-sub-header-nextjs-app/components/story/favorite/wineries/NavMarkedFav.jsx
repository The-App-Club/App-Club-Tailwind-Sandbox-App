import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo, useEffect, useState} from 'react';

import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';

const NavMarkedFav = () => {
  const {favoriteWineStories} = useFavoriteWineStory();
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
        `${favoriteWineStories.length === 0 ? 'opacity-0' : 'opacity-100'}`
      )}
    >
      {favoriteWineStories.length}
    </motion.span>
  );
};
export default memo(NavMarkedFav);
