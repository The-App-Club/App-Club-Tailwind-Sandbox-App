import {css, cx} from '@emotion/css';
import {memo} from 'react';

import useCart from '@/hooks/useCart';
import useFavoriteWine from '@/hooks/useFavoriteWine';

const Header = () => {
  const {addAllCart} = useCart();
  const {favoriteWines, removeAllFromFav} = useFavoriteWine();

  const handleRemoveAllFromFav = (e) => {
    removeAllFromFav();
  };

  const handleAddAllCart = (e) => {
    addAllCart({favedItems: favoriteWines});
  };

  return (
    <div
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          top: 6rem;
          min-height: 3rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        `,
        `bg-white dark:bg-slate-700 shadow-md`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        Favorite Wines
      </h2>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
          onClick={handleAddAllCart}
        >
          Add All Cart
        </button>
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
          onClick={handleRemoveAllFromFav}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default memo(Header);
