import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';

import useFavoriteWine from '@/hooks/useFavoriteWine';
import useFavoriteWinery from '@/hooks/useFavoriteWinery';

const Container = () => {
  const router = useRouter();
  const {favoriteWines} = useFavoriteWine();
  const {favoriteWineries} = useFavoriteWinery();
  const [isClient, setIsClient] = useState(false);
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
          `w-full flex flex-col items-center justify-center min-h-[20rem] border-2`,
          `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`
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
    </div>
  );
};

export default Container;
