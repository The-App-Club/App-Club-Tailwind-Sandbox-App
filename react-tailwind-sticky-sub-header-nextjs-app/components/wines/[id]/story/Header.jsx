import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import data from '@/data/wines.json';
import useCart from '@/hooks/useCart';

const Header = () => {
  const {addCart, removeCart, isCarted} = useCart();
  const router = useRouter();
  const {id} = router.query;
  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  const handleAddCart = useCallback(
    (e) => {
      e.stopPropagation();
      addCart({focusedItem: item});
    },
    [item] // eslint-disable-line
  );

  const handleRemoveCart = useCallback(
    (e) => {
      e.stopPropagation();
      removeCart({focusedItem: item});
    },
    [item] // eslint-disable-line
  );

  if (!item) {
    return;
  }

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
          @media (max-width: 768px) {
            display: none;
            min-height: 9rem;
          }
        `,
        `bg-white dark:bg-slate-700`
      )}
    >
      <h2
        className={cx(
          `w-full text-xl flex items-center justify-start gap-2`,
          css`
            @media (max-width: 768px) {
              flex-direction: column;
              align-items: flex-start;
            }
          `
        )}
      >
        Scroll Story@{item.wine}
        <span className="text-sm font-bold flex items-center gap-1">
          <GiGrapes size={28} />
          {`${item.winery}`}
        </span>
        <span className="text-sm font-bold flex items-center gap-1">
          <MdOutlineLocationOn size={28} />
          {`${item.location}`}
        </span>
      </h2>
      <div className="flex items-center gap-2">
        {isCarted({focusedItem: item}) ? (
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
            onClick={handleRemoveCart}
          >
            Remove Cart
          </button>
        ) : (
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
            onClick={handleAddCart}
          >
            Add Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
