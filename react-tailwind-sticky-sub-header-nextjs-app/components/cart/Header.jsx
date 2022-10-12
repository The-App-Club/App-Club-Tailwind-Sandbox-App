import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {memo} from 'react';
import CartSummary from '../CartSummary';
import SubHeader from './SubHeader';

const Header = () => {
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
      <SubHeader />
      <CartSummary />
    </div>
  );
};

export default memo(Header);
