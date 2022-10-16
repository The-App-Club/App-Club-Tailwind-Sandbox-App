import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import { memo, useEffect,useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import {GiGrapes} from 'react-icons/gi';
import {
  MdOutlineLocationOn,
} from 'react-icons/md';
import {useRecoilState, useRecoilValue} from 'recoil';

import ProductGalleryItemCarted from '@/components/ProductGalleryItemCarted';
import ProductGalleryItemFav from '@/components/ProductGalleryItemFav';
import Spacer from '@/components/Spacer';
import dataWineries from '@/data/wineries.json';
import useCart from '@/hooks/useCart';
import locationSelectorState from '@/stores/locationSelectorStore';
import themeState from '@/stores/themeStore';
import wineState from '@/stores/wineStore';

const ProductGalleryItem = ({item}) => {
  const router = useRouter();
  const {addCart, removeCart, isCarted} = useCart();
  const [isClient, setIsClient] = useState(false);
  const theme = useRecoilValue(themeState);
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const [activeWine, setActiveWine] = useRecoilState(wineState);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const handleAddCart = (e) => {
    e.stopPropagation();
    addCart({focusedItem: item});
  };

  const handleRemoveCart = (e) => {
    e.stopPropagation();
    removeCart({focusedItem: item});
  };

  const handleNewStory = (e) => {
    e.stopPropagation();
    setActiveWine({
      activeWine: item,
    });

    router.push({
      pathname: `/story/wines/${item.id}/create`,
    });
  };

  return (
    <div
      className={cx(
        `relative`,
        `w-full border-2 p-2`,
        `hover:cursor-pointer`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`
      )}
      onClick={(e) => {
        router.push({
          pathname: `/wines/${item.id}`,
        });
      }}
    >
      {isClient && <ProductGalleryItemCarted item={item} />}
      {isClient && <ProductGalleryItemFav item={item} />}
      <div
        className={css`
          width: 100%;
          height: 200px;
          position: relative;
          ::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url(${item.image});
            background-size: contain;
            background-position: center center;
            background-origin: center center;
            background-repeat: no-repeat;
          }
        `}
      >
        <div
          className={cx(
            'absolute bottom-2 right-0 flex items-center',
            css`
              z-index: 1;
            `
          )}
          onClick={handleNewStory}
        >
          <BsPencilSquare
            size={32}
            fill={`rgb(209 213 219)`} // bg-gray-300
          />
        </div>
      </div>
      <div className="w-full">
        <h2
          className={cx(
            'text-xl line-clamp-2',
            css`
              min-height: 56px;
            `
          )}
        >
          {item.wine}
        </h2>
        <Spacer height="0.5rem" />
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();
            const activeWineryItem = dataWineries.find((d) => {
              return d.wineryName === item.winery;
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
          <span className="break-words">{`${item.winery}`}</span>
        </div>
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();
            setLocation({
              activeLocationName: item.location,
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
          <span className="break-words">{`${item.location}`}</span>
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: flex-end;
            gap: 0.5rem;
            @media (max-width: 768px) {
              gap: 0;
              align-items: flex-end;
              justify-content: flex-end;
              flex-direction: column;
            }
          `}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl text-rose-400 dark:text-amber-400">
              {item.rating.average}
            </span>
            <span className="text-sm text-rose-400 dark:text-amber-400 line-clamp-1">
              {item.rating.reviews}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-md">{`$${numbro(item.price).format({
              thousandSeparated: true,
            })}`}</span>
          </div>
        </div>
        <Spacer height="0.5rem" />
        {isClient && (
          <div className="flex items-center justify-end gap-2">
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
        )}
        <Spacer height="0.5rem" />
        <p className="text-sm line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

export default memo(ProductGalleryItem);
