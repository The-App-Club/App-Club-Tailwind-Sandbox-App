import {css, cx} from '@emotion/css';
import Spacer from './Spacer';

import {dayjs, yyyymmddhhmmss} from '../utils/dateUtil';

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
          z-index: 1;
          @media (max-width: 1000px) {
            max-width: 100%;
          }
        `,
        `border-2 bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
        className
      )}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start border-b-2 mb-2 px-2`,
          css`
            min-height: 3rem;
          `
        )}
      >
        {title}
      </h2>
      {children}
      <div className="p-2 flex justify-end">
        <span>More See...</span>
      </div>
      <div className="p-2 flex justify-end">
        <span className="font-bold text-sm">
          {/* Lastest updated <span>{yyyymmddhhmmss(dayjs(new Date()))}</span> */}
          Lastest updated <span>{`2022/10/10 11:25:23`}</span>
        </span>
      </div>
    </aside>
  );
};

export default Tracer;
