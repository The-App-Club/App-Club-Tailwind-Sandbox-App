import {css, cx} from '@emotion/css';
import { useCallback, useEffect,useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa';

import useCart from '@/hooks/useCart';

const InputNumber = ({item}) => {
  const {carts, updateCart, removeCart} = useCart();
  // https://tailwindcomponents.com/component/number-input-counter
  const [amount, setAmount] = useState(item.amount);
  const handleChange = (e) => {
    e.stopPropagation();
    const willPurchasedAmount = Number(e.target.value);
    if (willPurchasedAmount < 1) {
      return;
    }
    setAmount(willPurchasedAmount);
    updateCart({
      focusedItem: item,
      willPurchasedAmount,
    });
  };

  useEffect(() => {
    setAmount(item.amount);
  }, [item, carts]);

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (amount < 2) {
      return;
    }
    setAmount((prevAmount) => {
      return prevAmount - 1;
    });
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setAmount((prevAmount) => {
      return prevAmount + 1;
    });
  };

  const handleRemove = useCallback(
    (e) => {
      removeCart({focusedItem: item});
    },
    [item] /* eslint-disable-line */
  );

  useEffect(() => {
    updateCart({
      focusedItem: item,
      willPurchasedAmount: amount,
    });
  }, [amount]); /* eslint-disable-line */

  return (
    <div
      className={cx(
        'custom-number-input w-[100px]',
        css`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          .custom-number-input input:focus {
            outline: none !important;
          }

          .custom-number-input button:focus {
            outline: none !important;
          }
        `
      )}
    >
      <label
        htmlFor="custom-input-number"
        className="w-full text-gray-700 dark:text-slate-200 text-sm font-semibold"
      >
        Amount
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 gap-2">
        <div className="flex flex-row w-full">
          <button
            data-action="decrement"
            className={cx(
              `h-full w-20 rounded-l cursor-pointer outline-none`,
              `text-gray-700 dark:text-gray-100 hover:text-black focus:text-black`,
              `bg-gray-300/70 hover:bg-gray-300/100 `,
              `hover:dark:text-white dark:bg-slate-600/70 hover:dark:bg-slate-600/100`
            )}
            onClick={handleDecrement}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="number"
            className={cx(
              ` w-full flex items-center text-center`,
              `focus:outline-none outline-none`,
              `font-semibold text-md md:text-basecursor-default`,
              `text-gray-700 dark:text-gray-100 hover:text-black focus:text-black`,
              `hover:text-gray-700 bg-gray-300/70 hover:bg-gray-300/100 `,
              `hover:dark:text-white dark:bg-slate-600/70 hover:dark:bg-slate-600/100`
            )}
            name="custom-input-number"
            value={amount}
            onChange={handleChange}
          />
          <button
            data-action="increment"
            className={cx(
              `h-full w-20 rounded-r cursor-pointer outline-none`,
              `text-gray-700 dark:text-gray-100 hover:text-black focus:text-black`,
              `bg-gray-300/70 hover:bg-gray-300/100 `,
              `hover:dark:text-white dark:bg-slate-600/70 hover:dark:bg-slate-600/100`
            )}
            onClick={handleIncrement}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
        <div>
          <button
            className={cx(
              'px-2 py-2 rounded-lg w-10 h-10 text-sm flex items-center justify-center',
              `hover:text-gray-700 bg-gray-300/70 hover:bg-gray-300/100 `,
              `hover:dark:text-white dark:bg-slate-600/70 hover:dark:bg-slate-600/100`
            )}
            onClick={handleRemove}
          >
            <FaTrashAlt size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
