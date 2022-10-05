import {default as numbro} from 'numbro';

const Product = ({item}) => {
  return (
    <div className="w-full flex items-start gap-2">
      <picture>
        <source srcSet={item.image} type={`image/png`} />
        <img src={item.image} alt={item.wine} width={130} height={'auto'} />
      </picture>
      <div className="w-full">
        <h2 className={`text-xl flex items-start line-clamp-1`}>{item.wine}</h2>
        <div className="flex items-center w-full justify-end gap-2">
          <span className="text-2xl">{`$${numbro(item.price).format({
            thousandSeparated: true,
          })}`}</span>
          <span className="text-4xl text-rose-400 dark:text-amber-400">
            {item.rating.average}
          </span>
          <span className="text-md">{item.rating.reviews}</span>
        </div>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Product;
