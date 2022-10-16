import {css} from '@emotion/css';

import LocationRanking from '@/components/feed/LocationRanking';
import PriceRanking from '@/components/feed/PriceRanking';
import RecentOrderRanking from '@/components/feed/RecentOrderRanking';
import ReviewRanking from '@/components/feed/ReviewRanking';
import WineryRanking from '@/components/feed/WineryRanking';

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
