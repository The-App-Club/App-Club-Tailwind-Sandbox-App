import {css, cx} from '@emotion/css';

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
          padding: 0 0.5rem;
          @media (max-width: 768px) {
          }
        `,
        `bg-white dark:bg-slate-700 shadow-md px-2`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        Chapters
      </h2>
      <div className="flex items-center gap-4">
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
          onClick={(e) => {}}
        >
          Add Chapter
        </button>
        <button
          className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
          onClick={(e) => {}}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default Header;
