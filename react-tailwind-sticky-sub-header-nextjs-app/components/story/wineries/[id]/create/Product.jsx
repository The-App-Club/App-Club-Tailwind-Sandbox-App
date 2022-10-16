import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineLocationOn,
} from 'react-icons/md';
import {default as numbro} from 'numbro';
import Spacer from '@/components/Spacer';
import {useRecoilState, useRecoilValue} from 'recoil';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import themeState from '@/stores/themeStore';
import useFavoriteWine from '@/hooks/useFavoriteWine';
import dataWineries from '@/data/wineries.json';
import locationSelectorState from '@/stores/locationSelectorStore';
import useCart from '@/hooks/useCart';
import ProductFav from '@/components/comment/ProductFav';
import ProductCarted from '@/components/comment/ProductCarted';
import {FaRegComments} from 'react-icons/fa';
import InputNumber from '@/components/comment/InputNumber';

import {motion} from 'framer-motion';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hidden: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const Product = ({item}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const theme = useRecoilValue(themeState);

  if (!item) {
    return;
  }

  return (
    <motion.div
      initial={'initial'}
      animate={'animate'}
      exit={'hidden'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      variants={motionConfig}
      onAnimationStart={(e) => {}}
      onAnimationComplete={(e) => {}}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `bg-white dark:bg-slate-700 shadow-md`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <GiWineBottle size={24} />
        Focused Wine
      </h2>

      <div className={cx(`relative`, `w-full h-full px-12 border-b-2`)}>
        {/* <ProductCarted item={item} />
        <ProductFav item={item} /> */}
        <div className="w-full flex gap-2">
          <div
            className={cx(
              css`
                min-width: 40px;
                min-height: 100px;
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
                  background-image: url(${item.thumbnail});
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
              className={cx(`text-xl`, `hover:cursor-pointer hover:underline`)}
              onClick={(e) => {
                e.stopPropagation();
                router.push({
                  pathname: `/wineries/${item.wineryId}`,
                });
              }}
            >
              {item.wineryName}
            </h2>
            <div
              className={cx(
                `text-sm font-bold flex items-center`,
                `hover:cursor-pointer hover:underline`
              )}
              onClick={(e) => {
                e.stopPropagation();

                router.push({
                  pathname: `/wineries/${item.wineryId}`,
                });
              }}
            >
              <GiGrapes
                size={24}
                className={css`
                  min-width: 24px;
                `}
              />
              <span className="break-words">{`${item.wineryName}`}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Product);
