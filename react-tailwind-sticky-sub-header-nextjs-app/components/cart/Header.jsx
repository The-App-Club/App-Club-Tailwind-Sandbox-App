import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {memo} from 'react';
import useCart from '../../hooks/useCart';
import CartSummary from '../CartSummary';
import ProductCartItem from '../ProductCartItem';

const Header = () => {
  const {removeAllFromCart} = useCart();

  const handleRemoveAllFromCart = (e) => {
    removeAllFromCart();
  };

  const handleCheckout = (e) => {
    console.log(`checkout`);
  };

  return (
    <div
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          top: 6rem;
          min-height: 3rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          gap: 1rem;
        `,
        `bg-white dark:bg-slate-700 shadow-md p-2`
      )}
    >
      <div className="w-full flex justify-between items-center gap-4">
        <h2
          className={cx(
            `w-full text-xl flex flex-col justify-start gap-1`,
            css`
              @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
              }
            `
          )}
        >
          Cart
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleRemoveAllFromCart}
          >
            Remove All
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
      <CartSummary />
    </div>
  );
};

export default memo(Header);
