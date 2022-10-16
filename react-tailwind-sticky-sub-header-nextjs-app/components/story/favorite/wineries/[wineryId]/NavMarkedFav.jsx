import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo, useEffect, useState} from 'react';

import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';
import {useRouter} from 'next/router';
import {useMemo} from 'react';

const NavMarkedFav = () => {
  const router = useRouter();
  const {wineryId} = router.query;
  const {favoriteWineryStories} = useFavoriteWineryStory();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const matchedFavoriteWineryStories = useMemo(() => {
    return favoriteWineryStories.filter((item) => {
      return item.wineryId === wineryId;
    });
  }, [wineryId, favoriteWineryStories]);

  return (
    <motion.span
      className={cx(
        'absolute right-2 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold',
        `${
          matchedFavoriteWineryStories.length === 0
            ? 'opacity-0'
            : 'opacity-100'
        }`
      )}
    >
      {matchedFavoriteWineryStories.length}
    </motion.span>
  );
};
export default memo(NavMarkedFav);
