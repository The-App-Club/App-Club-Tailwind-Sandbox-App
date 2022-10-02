import {css, cx} from '@emotion/css';

const Tracer = ({title = `Tracer`, className, children}) => {
  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          min-height: 24rem;
          width: 100%;
          position: sticky;
          top: 9rem;
          @media (max-width: 1000px) {
            max-width: 100%;
          }
        `,
        `border-2`,
        className
      )}
    >
      <h2
        className={cx(
          `text-2xl flex items-center justify-start`,
          css`
            min-height: 3rem;
          `
        )}
      >
        {title}
      </h2>
      {children}
    </aside>
  );
};

export default Tracer;
