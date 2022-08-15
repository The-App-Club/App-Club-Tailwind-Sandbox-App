import {css, cx} from '@emotion/css';
import {useMemo} from 'react';
import {motion} from 'framer-motion';
import ProgressBar from '@ramonak/react-progress-bar';
import {GiSpaceship} from 'react-icons/gi';

import {CgArrowTopRight} from 'react-icons/cg';
import {CgArrowBottomLeft} from 'react-icons/cg';

const DashboardSummaryCard = ({
  summaryTitle = `Total Ships`,
  icon,
  percent,
  count,
  delta,
}) => {
  return (
    <div
      className={cx(
        css`
          max-width: 22rem;
          @media (max-width: 1300px) {
            max-width: 40rem;
          }
          @media (max-width: 650px) {
            max-width: 46rem;
          }
          min-height: 8rem;
        `,
        `w-full border-2 p-2 rounded-lg flex flex-col gap-4 relative`
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {icon()}
        <span
          className={`flex items-center font-bold text-lg ${
            delta > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {`${delta}%`}
          {delta > 0 ? (
            <CgArrowTopRight size={24} />
          ) : (
            <CgArrowBottomLeft size={24} />
          )}
        </span>
      </div>
      <div className="flex items-center justify-between pb-3 gap-1">
        <h2 className="text-xl">{summaryTitle}</h2>
        <motion.div className="flex items-center justify-center font-bold gap-3 text-md">
          {`${percent}%`}
          <motion.span className="flex items-center justify-center font-semibold text-2xl">
            {`${count}`}
          </motion.span>
        </motion.div>
      </div>
      <div className="relative h-full">
        <span className="absolute -top-7 left-0">0%</span>
        <ProgressBar
          completed={percent}
          className={cx(css`
            .container {
              background-color: #e9ecef;
              border-radius: 50px;
            }

            .bar-completed {
              background-color: #0d6efd;
              width: ${percent}%;
              border-top-left-radius: 50px 50px;
              border-bottom-left-radius: 50px 50px;
            }

            .label {
              opacity: 0;
              visibility: hidden;
              font-size: 1.25rem;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `)}
          barContainerClassName="container"
          completedClassName="bar-completed"
          labelClassName="label"
        />
        <span className="absolute -top-7 right-0">100%</span>
      </div>
    </div>
  );
};

export {DashboardSummaryCard};
