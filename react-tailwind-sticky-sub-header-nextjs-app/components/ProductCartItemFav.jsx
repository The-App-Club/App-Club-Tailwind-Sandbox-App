import {css, cx} from '@emotion/css';
import {MdFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';
import useFavorite from '../hooks/useFavorite';

const ProductCartItemFav = ({item}) => {
  const {isFavorited, toggleFavorite} = useFavorite();
  return (
    <div
      className={cx(
        'absolute top-2 right-2 flex items-center',
        css`
          z-index: 1;
        `
      )}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite({focusedItem: item});
      }}
    >
      {isFavorited({focusedItem: item}) ? (
        <MdOutlineFavorite
          size={32}
          fill={`rgb(244 114 182)`} // bg-pink-400
          className={css``}
        />
      ) : (
        <MdFavoriteBorder
          size={32}
          fill={`rgb(209 213 219)`} // bg-gray-300
          className={css``}
        />
      )}
    </div>
  );
};

export default ProductCartItemFav;
