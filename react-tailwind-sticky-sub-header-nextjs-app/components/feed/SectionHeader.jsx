import {css, cx} from '@emotion/css';

const Header = () => {
  return (
    <div
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          top: 6rem;
          @media (max-width: 768px) {
            z-index: 3;
            position: initial;
            top: initial;
          }
          min-height: 3rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        `,
        `bg-white dark:bg-slate-700 shadow-md px-2`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        Feed
      </h2>
    </div>
  );
};

export default Header;
