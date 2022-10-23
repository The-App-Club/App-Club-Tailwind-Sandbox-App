import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useSetRecoilState} from 'recoil';

import Spacer from '@/components/Spacer';
import ProductCarted from '@/components/wines/[id]/ProductCarted';
import ProductFav from '@/components/wines/[id]/ProductFav';
import dataWineries from '@/data/wineries.json';
import useWine from '@/hooks/useWine';
import locationSelectorState from '@/stores/locationSelectorStore';

const Product = ({className = css``}) => {
  const setLocation = useSetRecoilState(locationSelectorState);
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  if (!activeWine) {
    return;
  }

  return (
    <div
      className={cx(
        `relative`,
        'w-full flex items-start gap-2 py-2 px-12',
        className
      )}
    >
      <ProductCarted item={activeWine} />
      <ProductFav item={activeWine} />
      <picture>
        <source srcSet={activeWine.image} type={`image/png`} />
        <img
          src={activeWine.image}
          alt={activeWine.wine}
          width={130}
          height={'auto'}
        />
      </picture>
      <div className="w-full">
        <h2 className={`text-xl flex items-start`}>{activeWine.wine}</h2>
        <div className="flex items-center w-full justify-end gap-2">
          <span className="text-2xl">{`$${numbro(activeWine.price).format({
            thousandSeparated: true,
          })}`}</span>
          <span className="text-4xl text-rose-400 dark:text-amber-400">
            {activeWine.rating.average}
          </span>
          <span className="text-sm">{activeWine.rating.reviews}</span>
        </div>
        <div className="flex items-start gap-2 flex-col">
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
        </div>
        <Spacer />
        <p>{activeWine.description}</p>
      </div>
    </div>
  );
};

export default Product;
