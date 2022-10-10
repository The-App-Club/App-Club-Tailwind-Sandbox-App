import {useRecoilValue} from 'recoil';
import FeedController from './FeedController';

import data from '../data/wines.json';
import {useMemo} from 'react';
import {filter, tidy} from '@tidyjs/tidy';
import tasteState from '../stores/tasteStore';
import ReviewRanking from './ReviewRanking';
import {css} from '@emotion/css';
import PriceRanking from './PriceRanking';
import RecentOrderRanking from './RecentOrderRanking';
import LocationRanking from './LocationRanking';
import WineryRanking from './WineryRanking';

const Feeder = () => {
  return (
    <div className="w-full">
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 1rem;
          @media (max-width: 768px) {
            gap: 1rem;
            flex-direction: column;
          }
        `}
      >
        <ReviewRanking
          className={css`
            position: initial;
            top: initial;
            z-index: initial;
          `}
        />
        <PriceRanking
          className={css`
            position: initial;
            top: initial;
            z-index: initial;
          `}
        />
        <RecentOrderRanking
          className={css`
            position: initial;
            top: initial;
            z-index: initial;
          `}
        />
        <LocationRanking
          className={css`
            position: initial;
            top: initial;
            z-index: initial;
          `}
        />
        <WineryRanking
          className={css`
            position: initial;
            top: initial;
            z-index: initial;
          `}
        />
      </div>
    </div>
  );
};

export default Feeder;
