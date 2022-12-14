import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {memo, useCallback} from 'react';
import {FaRegComments} from 'react-icons/fa';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineHistory, MdOutlineLocationOn} from 'react-icons/md';
import {useResetRecoilState, useSetRecoilState} from 'recoil';

import dataWineries from '@/data/wineries.json';
import useCart from '@/hooks/useCart';
import useWine from '@/hooks/useWine';
import locationSelectorState from '@/stores/locationSelectorStore';
import wineState from '@/stores/wineStore';

const Header = () => {
  const setLocation = useSetRecoilState(locationSelectorState);
  const {addCart, removeCart, isCarted} = useCart();
  const setActiveWine = useResetRecoilState(wineState);

  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

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
          align-items: flex-start;
          gap: 0.5rem;
        `,
        `bg-white dark:bg-slate-700 shadow-md p-2`
      )}
    >
      <h2
        className={cx(
          `w-full text-xl flex flex-col justify-start gap-1`,
          css`
            @media (max-width: 768px) {
              flex-direction: column;
              align-items: flex-start;
            }
          `
        )}
      >
        {activeWine.wine}
        <span
          className={cx(
            `text-sm font-bold flex items-center gap-1`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            const activeWineryItem = dataWineries.find((d) => {
              return d.wineryName === activeWine.winery;
            });
            router.push({
              pathname: `/wineries/${activeWineryItem.wineryId}`,
            });
          }}
        >
          <GiGrapes
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          {`${activeWine.winery}`}
        </span>
        <span
          className={cx(
            `text-sm font-bold flex items-center gap-1`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            setLocation({
              activeLocationId: activeWine.locationId,
              activeLocationName: activeWine.location,
            });
            router.push({
              pathname: `/location`,
            });
          }}
        >
          <MdOutlineLocationOn
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          {`${activeWine.location}`}
        </span>
        <div className="w-full flex items-center gap-2">
          <span
            className={cx(
              `text-sm font-bold flex items-center gap-1`,
              `hover:cursor-pointer hover:underline`
            )}
            onClick={(e) => {
              setActiveWine({
                activeWine: activeWine,
              });
              router.push({
                pathname: `/wines/${id}/story`,
              });
            }}
          >
            <MdOutlineHistory
              size={24}
              className={css`
                min-width: 24px;
              `}
            />
            {`See story`}
          </span>
          <span
            className={cx(
              `text-sm font-bold flex items-center gap-1`,
              `hover:cursor-pointer hover:underline`
            )}
            onClick={(e) => {
              setActiveWine({
                activeWine: activeWine,
              });
              router.push({
                pathname: `/wines/${id}/comment`,
              });
            }}
          >
            <FaRegComments
              size={24}
              className={css`
                min-width: 24px;
              `}
            />
            {`See comment`}
          </span>
        </div>
      </h2>
      <motion.div className="flex items-start gap-2 flex-col">
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
        <div className="w-full">
          <div className="text-xl w-full">{`$${numbro(activeWine.price).format({
            thousandSeparated: true,
          })}`}</div>
          <div className="text-xl text-rose-400 dark:text-amber-400">
            {activeWine.rating.average}
          </div>
          <div className="text-sm">{activeWine.rating.reviews}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Header);
