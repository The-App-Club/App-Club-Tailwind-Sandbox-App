import {css, cx} from '@emotion/css';
import {FaRegComments} from 'react-icons/fa';

const FocusedComment = () => {
  return (
    <aside
      className={cx(
        css`
          width: 100%;
          position: sticky;
          top: calc(9rem + 16px);
          z-index: 1;
          min-height: 20rem; // mock attach
          @media (max-width: 1000px) {
            order: 2;
            max-width: 100%;
          }
        `,
        `bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
        `border-2 border-gray-200 dark:border-slate-500`
      )}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <FaRegComments size={24} />
        Focused Comment
      </h2>
      <p>
        At Here Show all thread relatived the commentId using vertical timeline
        when the thread clicked.
      </p>
    </aside>
  );
};

export default FocusedComment;
