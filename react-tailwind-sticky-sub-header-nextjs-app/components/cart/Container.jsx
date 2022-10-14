import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {memo, useEffect, useState} from 'react';
import useCart from '../../hooks/useCart';
import ReviewRanking from '../ReviewRanking';
import Product from './Product';

const Container = () => {
  const [isClient, setIsClient] = useState(false);
  const {carts} = useCart();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);
  const renderCartContent = () => {
    if (carts.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing wines in cart...</p>
          <Link href={`/wines`}>
            <a className="hover:underline">See Wines</a>
          </Link>
        </div>
      );
    } else {
      return (
        <div
          className={css`
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            gap: 3rem;
          `}
        >
          {carts.map((item, index) => {
            return <Product key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderCartContent()}</>;
};

export default memo(Container);
