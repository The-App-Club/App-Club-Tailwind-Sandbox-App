import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {GiGrapes} from 'react-icons/gi';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineLocationOn,
} from 'react-icons/md';
import {default as numbro} from 'numbro';
import Spacer from './Spacer';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useCallback, useEffect, useMemo, useState} from 'react';
import themeState from '../stores/themeStore';
import useFavorite from '../hooks/useFavorite';
import dataWineries from '../data/wineries.json';
import locationSelectorState from '../stores/locationSelectorStore';
import {memo} from 'react';
import ProductGalleryItemFav from './ProductGalleryItemFav';

const ProductGalleryItem = ({item}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const theme = useRecoilValue(themeState);
  const [winery, setWinery] = useRecoilState(locationSelectorState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

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
      />
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
              pathname: `/winery/${activeWineryItem.wineryId}`,
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
            setWinery({
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
              align-items: flex-start;
              justify-content: flex-start;
              flex-direction: column;
            }
          `}
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl text-rose-400 dark:text-amber-400">
              {item.rating.average}
            </span>
            <span className="text-sm text-rose-400 dark:text-amber-400 line-clamp-1">
              {item.rating.reviews}
            </span>
          </div>
          <span className="text-2xl">{`$${numbro(item.price).format({
            thousandSeparated: true,
          })}`}</span>
        </div>
        <p className="text-sm line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

export default memo(ProductGalleryItem);
