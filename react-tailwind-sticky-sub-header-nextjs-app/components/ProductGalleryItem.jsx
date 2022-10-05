import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {default as numbro} from 'numbro';

const ProductGalleryItem = ({item}) => {
  const router = useRouter();
  return (
    <div
      className={cx(
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
        <h2 className="text-xl line-clamp-1">{item.wine}</h2>
        <div className="text-sm font-bold flex items-center">
          <GiGrapes size={24} />
          <span className="line-clamp-1">{`${item.winery}`}</span>
        </div>
        <div className="text-sm font-bold flex items-center">
          <MdOutlineLocationOn size={24} />
          <span className="line-clamp-1">{`${item.location}`}</span>
        </div>
        <div className="flex items-center w-full justify-end gap-2">
          <span className="text-2xl">{`$${numbro(item.price).format({
            thousandSeparated: true,
          })}`}</span>
          <span className="text-4xl text-rose-400 dark:text-amber-400">
            {item.rating.average}
          </span>
          <span className="text-sm text-rose-400 dark:text-amber-400">
            {item.rating.reviews}
          </span>
        </div>
        <p className="line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

export default ProductGalleryItem;
