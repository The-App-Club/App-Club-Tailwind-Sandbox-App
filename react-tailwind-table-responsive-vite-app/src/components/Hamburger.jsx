import {css, cx} from '@emotion/css';

const Hamburger = ({opened, handleClick, className}) => {
  return (
    <div
      className={cx(
        css`
          width: 32px;
          height: 32px;
        `,
        'relative h-full w-full',
        className
      )}
    >
      <button
        className={cx(
          `hamburger`,
          `hamburger--elastic`,
          `${opened ? 'is-active' : ''}`,
          css`
            padding: 0;
            top: 0;
            left: 0;
            width: 100%;
          `
        )}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        aria-expanded={opened}
        onClick={handleClick}
      >
        <span
          className={cx(
            css`
              width: 32px;
              height: 32px;
              display: flex;
              justify-content: center;
              align-items: center;
            `,
            'hamburger-box'
          )}
        >
          <span
            className={cx(
              css`
                &,
                ::before,
                ::after {
                  width: 32px;
                }
                & {
                  top: 6px !important;
                }
              `,
              'hamburger-inner'
            )}
          ></span>
        </span>
      </button>
    </div>
  );
};

export {Hamburger};
