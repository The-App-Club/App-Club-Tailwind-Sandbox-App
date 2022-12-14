import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {memo} from 'react';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useSetRecoilState} from 'recoil';

import ProductCarted from '@/components/story/wines/[id]/published/ProductCarted';
import ProductFav from '@/components/story/wines/[id]/published/ProductFav';
import dataWineries from '@/data/wineries.json';
import useWine from '@/hooks/useWine';
import locationSelectorState from '@/stores/locationSelectorStore';

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

const Product = () => {
  const setLocation = useSetRecoilState(locationSelectorState);
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  if (!activeWine) {
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
        <ProductCarted />
        <ProductFav />
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
                  background-image: url(${activeWine.image});
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
                  pathname: `/wines/${activeWine.id}`,
                });
              }}
            >
              {activeWine.wine}
            </h2>
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
              <span className="break-words">{`${activeWine.location}`}</span>
            </div>
            <div
              className={css`
                width: 100%;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                flex-direction: column;
              `}
            >
              <div className="flex items-start flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                <span className="text-xl text-rose-400 dark:text-amber-400">
                  {activeWine.rating.average}
                </span>
                <span className="text-sm text-rose-400 dark:text-amber-400 line-clamp-1">
                  {activeWine.rating.reviews}
                </span>
              </div>
              <div className="flex items-end justify-center">
                <span className="text-lg">{`$${numbro(activeWine.price).format({
                  thousandSeparated: true,
                })}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Product);
