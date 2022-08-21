import {css, cx} from '@emotion/css';
import useDarkMode from 'use-dark-mode';

const Hamburger = ({open, handleClick, className}) => {
  const darkMode = useDarkMode();

  return (
    <div
      className={cx(
        css`
          position: absolute;
          top: 0.5rem;
          right: 0.75rem;
          z-index: 1;
        `,
        className
      )}
    >
      <div
        className={cx(
          css`
            z-index: 1;
            width: 32px;
            height: 32px;
          `,
          'relative h-full w-full'
        )}
      >
        <button
          className={cx(
            `hamburger`,
            `hamburger--elastic`,
            `${open ? 'is-active' : ''}`,
            css`
              padding: 0;
              top: 0;
              left: 0;
              width: 100%;
            `,
            `${
              darkMode.value
                ? css`
                    &,
                    &.is-active {
                      .hamburger-inner,
                      .hamburger-inner::before,
                      .hamburger-inner::after {
                        background-color: white;
                      }
                    }
                  `
                : css``
            }`
          )}
          type="button"
          aria-label="Menu"
          aria-controls="navigation"
          aria-expanded={open}
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
                // https://tailwindcss.com/docs/content
                // `dark:bg-white dark:before:bg-white dark:after:bg-white`
              )}
            ></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export {Hamburger};
