import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo, useEffect, useMemo, useState} from 'react';

import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';
import {useRouter} from 'next/router';

const NavMarkedFav = () => {
  const router = useRouter();
  const {favoriteWineStories} = useFavoriteWineStory();
  const [isClient, setIsClient] = useState(false);

  const {wineId} = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const matchedFavoriteWineStories = useMemo(() => {
    return favoriteWineStories.filter((item) => {
      return item.wineId === wineId;
    });
  }, [wineId, favoriteWineStories]);

  return (
    <motion.span
      className={cx(
        'absolute right-2 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
        `${
          matchedFavoriteWineStories.length === 0 ? 'opacity-0' : 'opacity-100'
        }`
      )}
    >
      {matchedFavoriteWineStories.length}
    </motion.span>
  );
};
export default memo(NavMarkedFav);
