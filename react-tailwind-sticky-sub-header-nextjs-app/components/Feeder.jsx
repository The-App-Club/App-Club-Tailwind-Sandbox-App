import {useRecoilValue} from 'recoil';
import FeedController from './FeedController';

import data from '../data/wines.json';
import {useMemo} from 'react';
import {filter, tidy} from '@tidyjs/tidy';
import tasteState from '../stores/tasteStore';
import ReviewRanking from './ReviewRanking';
import {css} from '@emotion/css';
import PriceRanking from './PriceRanking';

const Feeder = () => {
  return (
    <div className="w-full">
      <div
        className={css`
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
          @media (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 768px) {
            grid-template-columns: repeat(1, 1fr);
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
      </div>
    </div>
  );
};

export default Feeder;
