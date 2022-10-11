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
import {useEffect, useMemo, useState} from 'react';
import themeState from '../stores/themeStore';
import useFavorite from '../hooks/useFavorite';
import dataWineries from '../data/wineries.json';
import locationSelectorState from '../stores/locationSelectorStore';

const ProductGalleryItem = ({item}) => {
  const router = useRouter();
  const [winery, setWinery] = useRecoilState(locationSelectorState);
  const theme = useRecoilValue(themeState);
  const {isFavorited, toggleFavorite} = useFavorite();

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

export default ProductGalleryItem;
