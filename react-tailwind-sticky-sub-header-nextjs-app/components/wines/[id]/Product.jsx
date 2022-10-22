import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useRecoilState} from 'recoil';

import Spacer from '@/components/Spacer';
import ProductCarted from '@/components/wines/[id]/ProductCarted';
import ProductFav from '@/components/wines/[id]/ProductFav';
import dataWineries from '@/data/wineries.json';
import locationSelectorState from '@/stores/locationSelectorStore';
import {useMemo} from 'react';
import dataWines from '@/data/wines.json';

const Product = ({className = css``}) => {
  const router = useRouter();
  const {id} = router.query;
  const [location, setLocation] = useRecoilState(locationSelectorState);

  const item = useMemo(() => {
    return dataWines.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  if (!item) {
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
      <ProductCarted item={item} />
      <ProductFav item={item} />
      <picture>
        <source srcSet={item.image} type={`image/png`} />
        <img src={item.image} alt={item.wine} width={130} height={'auto'} />
      </picture>
      <div className="w-full">
        <h2 className={`text-xl flex items-start`}>{item.wine}</h2>
        <div className="flex items-center w-full justify-end gap-2">
          <span className="text-2xl">{`$${numbro(item.price).format({
            thousandSeparated: true,
          })}`}</span>
          <span className="text-4xl text-rose-400 dark:text-amber-400">
            {item.rating.average}
          </span>
          <span className="text-sm">{item.rating.reviews}</span>
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
        </div>
        <Spacer />
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Product;
