import {css, cx} from '@emotion/css';
import {useMemo} from 'react';
import {motion, useAnimationControls} from 'framer-motion';
import ProgressBar from '@ramonak/react-progress-bar';
import {GiSpaceship} from 'react-icons/gi';

import {CgArrowTopRight} from 'react-icons/cg';
import {CgArrowBottomLeft} from 'react-icons/cg';
import {useEffect} from 'react';

const DashboardSummaryCard = ({
  summaryTitle = `Total Ships`,
  icon,
  percent,
  count,
  delta,
}) => {
  const percentIndicatorControls = useAnimationControls();
  const percentControls = useAnimationControls();
  const countControls = useAnimationControls();
  const deltaControls = useAnimationControls();

  useEffect(() => {
    percentIndicatorControls.start({
      width: `${percent}%`,
    });
    percentControls.start({
      y: 0,
      opacity: 1,
    });
    countControls.start({
      y: 0,
      opacity: 1,
    });
    deltaControls.start({
      x: 0,
      opacity: 1,
    });
  }, [percent, count, delta]);

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
      <h2 className="text-xl flex items-center justify-center">
        {summaryTitle}
      </h2>
      <div className="flex items-center justify-center gap-2">
        {icon()}
        <motion.span
          initial={{
            y: 60,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: `easeInOut`,
          }}
          animate={countControls}
          className="flex items-center justify-center font-semibold text-2xl"
        >
          {`${count}`}
        </motion.span>

        {delta > 0 ? (
          <motion.span
            initial={{
              x: -60,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: `easeInOut`,
            }}
            animate={deltaControls}
            className={`flex items-center font-bold text-sm ${
              delta > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {`${delta}%`}
            <CgArrowTopRight size={24} />
          </motion.span>
        ) : (
          <motion.span
            initial={{
              x: 60,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: `easeInOut`,
            }}
            animate={deltaControls}
            className={`flex items-center font-bold text-sm ${
              delta > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {`${delta}%`}
            <CgArrowBottomLeft size={24} />
          </motion.span>
        )}
      </div>
      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
          ease: `easeInOut`,
          delay: 0.3,
        }}
        animate={percentControls}
        className="flex justify-center items-center font-bold text-md -mb-3"
      >
        {`${percent}%`}
      </motion.div>
      <div className="relative h-full">
        <span className="absolute -top-7 left-0">0%</span>
        <motion.div
          className={cx(
            css`
              width: 100%;
              height: 100%;
              background-color: #e9ecef;
            `,
            `rounded-lg`
          )}
        >
          <motion.div
            animate={percentIndicatorControls}
            transition={{
              duration: 1.2,
              ease: `easeOut`,
            }}
            className={cx(
              css`
                width: 0%;
                height: 1.25rem;
                background-color: #0d6efd;
              `,
              `rounded-lg`
            )}
          ></motion.div>
        </motion.div>
        <span className="absolute -top-7 right-0">100%</span>
      </div>
    </div>
  );
};

export {DashboardSummaryCard};
