import {css, cx} from '@emotion/css';
import {memo, useCallback} from 'react';
import {MdFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';
import useFavorite from '../hooks/useFavorite';
import {BsCart, BsCartCheck} from 'react-icons/bs';
import useCart from '../hooks/useCart';

const ProductGalleryItemCarted = ({item}) => {
  const {carts, addCart, removeCart, isCarted} = useCart();
  const handleCart = useCallback(
    (e) => {
      e.stopPropagation();
      if (isCarted({focusedItem: item})) {
        removeCart({focusedItem: item});
      } else {
        addCart({focusedItem: item});
      }
    },
    [item, carts] /* eslint-disable-line */
  );
  return (
    <div
      className={cx(
        'absolute top-2 left-2 flex items-center',
        css`
          z-index: 1;
        `
      )}
      onClick={handleCart}
    >
      {isCarted({focusedItem: item}) ? (
        <BsCartCheck
          size={32}
          fill={`rgb(244 114 182)`} // bg-pink-400
        />
      ) : (
        <BsCart
          size={32}
          fill={`rgb(209 213 219)`} // bg-gray-300
        />
      )}
    </div>
  );
};

export default memo(ProductGalleryItemCarted);
