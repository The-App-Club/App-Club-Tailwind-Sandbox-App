import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {memo, useCallback} from 'react';
import {MdFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';

import useFavoriteWine from '@/hooks/useFavoriteWine';
import useWine from '@/hooks/useWine';

const ProductFav = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});
  const {isFavorited, toggleFavorite} = useFavoriteWine(activeWine);
  const handleFav = useCallback(
    (e) => {
      e.stopPropagation();
      toggleFavorite({focusedItem: activeWine});
    },
    [activeWine] /* eslint-disable-line */
  );

  if (!activeWine) {
    return;
  }

  return (
    <div
      className={cx(
        `absolute top-2 right-2 flex items-center`,
        `hover:cursor-pointer`,
        css`
          z-index: 1;
        `
      )}
      onClick={handleFav}
    >
      {isFavorited({focusedItem: activeWine}) ? (
        <MdOutlineFavorite
          size={32}
          fill={`rgb(244 114 182)`} // bg-pink-400
        />
      ) : (
        <MdFavoriteBorder
          size={32}
          fill={`rgb(209 213 219)`} // bg-gray-300
        />
      )}
    </div>
  );
};

export default memo(ProductFav);
