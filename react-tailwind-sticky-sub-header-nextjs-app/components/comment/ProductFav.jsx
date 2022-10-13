import {css, cx} from '@emotion/css';
import {memo, useCallback} from 'react';
import {MdFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';
import useFavorite from '../../hooks/useFavorite';

const ProductFav = ({item}) => {
  const {isFavorited, toggleFavorite} = useFavorite(item);
  const handleFav = useCallback(
    (e) => {
      e.stopPropagation();
      toggleFavorite({focusedItem: item});
    },
    [item] /* eslint-disable-line */
  );
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
      {isFavorited({focusedItem: item}) ? (
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
