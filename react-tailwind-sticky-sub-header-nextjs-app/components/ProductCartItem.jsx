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
import InputNumber from './InputNumber';
import dataWineries from '../data/wineries.json';
import locationSelectorState from '../stores/locationSelectorStore';
import useCart from '../hooks/useCart';

const ProductCartItem = ({item}) => {
  const router = useRouter();
  const [winery, setWinery] = useRecoilState(locationSelectorState);
  const theme = useRecoilValue(themeState);
  const {isFavorited, toggleFavorite} = useFavorite();
  return (
    <div
      className={cx(
        `relative`,
        `w-full h-full border-2 py-2 px-12`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`,
        `hover:shadow-2xl hover:cursor-pointer rounded-2xl`
      )}
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
      <div className="w-full flex gap-2">
        <div
          className={cx(
            css`
              min-width: 200px;
              @media (max-width: 768px) {
                min-width: 100px;
              }
              min-height: 300px;
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
            `
          )}
        />
        <div className="w-full">
          <h2
            className={cx(
              'text-xl sm:text-2xl',
              `hover:cursor-pointer hover:underline`
            )}
            onClick={(e) => {
              e.stopPropagation();
              router.push({
                pathname: `/wines/${item.id}`,
              });
            }}
          >
            {item.wine}
          </h2>
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
            <div className="flex items-start flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
              <span className="text-xl text-rose-400 dark:text-amber-400">
                {item.rating.average}
              </span>
              <span className="text-sm text-rose-400 dark:text-amber-400 line-clamp-1">
                {item.rating.reviews}
              </span>
              <span className="text-lg sm:text-xl">{`$${numbro(
                item.price
              ).format({
                thousandSeparated: true,
              })}`}</span>
            </div>
          </div>
          <InputNumber item={item} />
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
