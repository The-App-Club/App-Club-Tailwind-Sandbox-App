import {css, cx} from '@emotion/css';
import {memo} from 'react';

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
          gap: 1rem;
        `,
        `bg-white dark:bg-slate-700 shadow-md`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        Favorite
      </h2>
    </div>
  );
};

export default memo(Header);
