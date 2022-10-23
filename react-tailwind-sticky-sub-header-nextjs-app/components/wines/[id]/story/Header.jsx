import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';

import useCart from '@/hooks/useCart';
import useWine from '@/hooks/useWine';

const Header = () => {
  const {addCart, removeCart, isCarted} = useCart();
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const handleAddCart = useCallback(
    (e) => {
      e.stopPropagation();
      addCart({focusedItem: activeWine});
    },
    [activeWine, addCart]
  );

  const handleRemoveCart = useCallback(
    (e) => {
      e.stopPropagation();
      removeCart({focusedItem: activeWine});
    },
    [activeWine, removeCart]
  );

  if (!activeWine) {
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
        Scroll Story@{activeWine.wine}
        <span className="text-sm font-bold flex items-center gap-1">
          <GiGrapes size={28} />
          {`${activeWine.winery}`}
        </span>
        <span className="text-sm font-bold flex items-center gap-1">
          <MdOutlineLocationOn size={28} />
          {`${activeWine.location}`}
        </span>
      </h2>
      {isClient && (
        <div className="flex items-center gap-2">
          {isCarted({focusedItem: activeWine}) ? (
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
      )}
    </div>
  );
};

export default Header;
