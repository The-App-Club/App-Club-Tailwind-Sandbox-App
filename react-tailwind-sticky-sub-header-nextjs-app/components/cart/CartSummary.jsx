import {css, cx} from '@emotion/css';
import { map, sum, summarize, tidy} from '@tidyjs/tidy';
import {default as numbro} from 'numbro';
import {memo, useEffect, useMemo, useState} from 'react';

import useCart from '@/hooks/useCart';

const CartSummary = () => {
  const {carts} = useCart();
  const [isClient, setIsClient] = useState(false);

  const productCount = useMemo(() => {
    return carts.length;
  }, [carts]);

  const [{totalAmount}] = useMemo(() => {
    return tidy(
      carts,
      summarize({
        totalAmount: sum('amount'),
      })
    );
  }, [carts]);

  const [{totalPrice}] = useMemo(() => {
    return tidy(
      carts,
      map((item) => {
        return {
          ...item,
          subTotalPrice: item.amount * item.price,
        };
      }),
      summarize({
        totalPrice: sum('subTotalPrice'),
      })
    );
  }, [carts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <div
      className={cx(
        'w-full flex justify-start items-center gap-1',
        css`
          @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
          }
        `
      )}
    >
      <div className="flex items-center gap-1">
        <span className="text-md">Summary</span>
        {isClient && (
          <span className="text-sm font-bold">{`$${numbro(totalPrice).format({
            thousandSeparated: true,
          })}`}</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-md">Products</span>
        {isClient && (
          <span className="text-sm font-bold">{`${productCount} items`}</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-md">Amount</span>
        {isClient && (
          <span className="text-sm font-bold">{`${totalAmount} amount`}</span>
        )}
      </div>
    </div>
  );
};

export default memo(CartSummary);
