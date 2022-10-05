import {css, cx} from '@emotion/css';

const TraceFooter = () => {
  return (
    <aside
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          bottom: 0;
          min-height: 3rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `,
        `bg-white dark:bg-slate-700 border-2`
      )}
    >
      TraceFooter
    </aside>
  );
};

export default TraceFooter;
