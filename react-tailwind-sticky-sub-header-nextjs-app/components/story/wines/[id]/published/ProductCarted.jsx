import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {memo, useCallback} from 'react';
import {BsCart, BsCartCheck} from 'react-icons/bs';

import useCart from '@/hooks/useCart';
import useWine from '@/hooks/useWine';

const ProductCarted = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  const {carts, addCart, removeCart, isCarted} = useCart();
  const handleCart = useCallback(
    (e) => {
      e.stopPropagation();
      if (isCarted({focusedItem: activeWine})) {
        removeCart({focusedItem: activeWine});
      } else {
        addCart({focusedItem: activeWine});
      }
    },
    [activeWine, carts] /* eslint-disable-line */
  );

  if (!activeWine) {
    return;
  }

  return (
    <div
      className={cx(
        `absolute top-2 left-2 flex items-center`,
        `hover:cursor-pointer`,
        css`
          z-index: 1;
        `
      )}
      onClick={handleCart}
    >
      {isCarted({focusedItem: activeWine}) ? (
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

export default memo(ProductCarted);
