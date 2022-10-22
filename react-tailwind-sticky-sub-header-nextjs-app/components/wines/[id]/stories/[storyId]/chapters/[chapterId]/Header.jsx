import {css, cx} from '@emotion/css';

const Header = ({item}) => {
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
          @media (max-width: 768px) {
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
          }
        `,
        `bg-white dark:bg-slate-700 shadow-md p-2`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        {item.chapterTitle}
      </h2>

      <button
        className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
        onClick={(e) => {}}
      >
        Save
      </button>
    </div>
  );
};

export default Header;
