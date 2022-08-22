import {Link} from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {css, cx} from '@emotion/css';

const Breadcrumbs = ({className = css``}) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={cx(css``, className)}>
      {breadcrumbs.map(({match, breadcrumb}, index) => {
        return (
          <span
            key={match.pathname}
            className={css`
              display: inline-flex;
              align-items: center;
              gap: 0.6rem;
              @media (max-width: 768px) {
                gap: 0.5rem;
              }
            `}
          >
            {index === 0 ? null : (
              <span
                className={css`
                  display: inline-block;
                  width: 10px;
                `}
              >
                >
              </span>
            )}
            <Link
              to={match.pathname}
              className={css`
                color: black;
                text-decoration: none;
              `}
            >
              {breadcrumb}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export {Breadcrumbs};
