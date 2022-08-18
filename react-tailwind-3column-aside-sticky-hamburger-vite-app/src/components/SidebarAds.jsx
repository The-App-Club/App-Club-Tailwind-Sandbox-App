import {css, cx} from '@emotion/css';
import {Scrollbars} from 'rc-scrollbars';

const SidebarAds = ({className}) => {
  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          position: relative;
          ::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3rem;
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(3px);
            z-index: 1;
          }
          ::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3rem;
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(3px);
            z-index: 1;
          }
        `,
        `border-2 rounded-lg`,
        className
      )}
    >
      <Scrollbars
        className={cx(
          css`
            min-width: 18rem;
            width: 100%;
            height: 100%;
            min-height: 26rem;
            max-height: 30rem;
          `,
          `overflow-hidden overflow-y-auto`
        )}
      >
        <ul
          className={cx(
            css`
              padding: 3rem 0;
            `,
            ''
          )}
        >
          {[...Array(30).keys()].map((n, index) => {
            return (
              <li
                key={index}
                className={cx(
                  css`
                    min-height: 8rem;
                    width: 100%;
                  `,
                  `p-2`
                )}
              >
                <h2 className="text-lg">{`item ${n}`}</h2>
              </li>
            );
          })}
        </ul>
      </Scrollbars>
    </aside>
  );
};

export {SidebarAds};
