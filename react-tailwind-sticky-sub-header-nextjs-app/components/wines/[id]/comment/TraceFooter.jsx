import {css, cx} from '@emotion/css';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import wineState from '@/stores/wineStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import locationSelectorState from '@/stores/locationSelectorStore';
import {useRouter} from 'next/router';
import dataWineries from '@/data/wineries.json';
import {useCallback} from 'react';
import useCart from '@/hooks/useCart';

const TraceFooter = () => {
  const router = useRouter();
  const {activeWine} = useRecoilValue(wineState);
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const {addCart, removeCart, isCarted} = useCart();

  const handleAddCart = useCallback(
    (e) => {
      e.stopPropagation();
      addCart({focusedItem: activeWine});
    },
    [activeWine] // eslint-disable-line
  );

  const handleRemoveCart = useCallback(
    (e) => {
      e.stopPropagation();
      removeCart({focusedItem: activeWine});
    },
    [activeWine] // eslint-disable-line
  );

  if (!activeWine) {
    return;
  }

  return (
    <aside
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          bottom: 0;
          min-height: 5rem;
          width: 100%;
          display: none;
          @media (max-width: 768px) {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
          }
        `,
        `bg-white dark:bg-slate-700 border-2`
      )}
    >
      <div className="relative w-full p-2">
        <h3 className="text-sm font-bold">{activeWine.wine}</h3>
        <div>
          <div
            className={cx(
              `text-sm font-bold flex items-center`,
              `hover:cursor-pointer hover:underline`
            )}
            onClick={(e) => {
              e.stopPropagation();
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
            <span className="break-words">{`${activeWine.winery}`}</span>
          </div>
          <div
            className={cx(
              `text-sm font-bold flex items-center`,
              `hover:cursor-pointer hover:underline`
            )}
            onClick={(e) => {
              e.stopPropagation();
              setLocation({
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
            <span className="break-words">{`${activeWine.location}`}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          {isCarted({focusedItem: activeWine}) ? (
            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-full text-sm text-center"
              onClick={handleRemoveCart}
            >
              Remove Cart
            </button>
          ) : (
            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-full text-sm text-center"
              onClick={handleAddCart}
            >
              Add Cart
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default TraceFooter;
