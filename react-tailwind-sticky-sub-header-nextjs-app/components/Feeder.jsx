import {useRecoilValue} from 'recoil';
import FeedController from './FeedController';

import data from '../data/wines.json';
import {useMemo} from 'react';
import {filter, tidy} from '@tidyjs/tidy';
import tasteState from '../stores/tasteStore';

const Feeder = () => {
  return (
    <div className="w-full">
      <h2>Feeder</h2>
    </div>
  );
};

export default Feeder;
