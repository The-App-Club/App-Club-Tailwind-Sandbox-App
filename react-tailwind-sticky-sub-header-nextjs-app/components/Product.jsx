import {css, cx} from '@emotion/css';
import {default as numbro} from 'numbro';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import Spacer from './Spacer';
import dataWineries from '../data/wineries.json';
import {useRouter} from 'next/router';

const Product = ({item, className = css``}) => {
  const router = useRouter();

  return (
    <div className={cx('w-full flex items-start gap-2 py-2 px-12', className)}>
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
        <div className="flex items-start gap-2 flex-col sm:flex-row">
          <span
            className="text-sm font-bold flex items-center hover:cursor-pointer hover:underline"
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
            <GiGrapes size={24} />
            {`${item.winery}`}
          </span>
          <span className="text-sm font-bold flex items-center">
            <MdOutlineLocationOn size={24} />
            {`${item.location}`}
          </span>
        </div>
        <Spacer />
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Product;
