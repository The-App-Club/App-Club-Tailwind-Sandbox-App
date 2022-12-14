import {css, cx} from '@emotion/css';
import {filter, groupBy, map, mutate, tidy} from '@tidyjs/tidy';
import {useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import AverageGraph from '@/components/AverageGraph';
import PriceGraph from '@/components/PriceGraph';
import ReviewGraph from '@/components/ReviewGraph';
import Spacer from '@/components/Spacer';
import data from '@/data/wines.json';
import locationSelectorState from '@/stores/locationSelectorStore';

export const decideBarBackFaceFillColor = ({mode}) => {
  if (mode === `light`) {
    return `rgb(243 244 246)`; // bg-gray-100
  }
  if (mode === `dark`) {
    return `rgb(30 41 59)`; // bg-slate-800
  }
};

export const decideAxisTickFillColor = ({mode}) => {
  if (mode === `light`) {
    return `rgb(75 85 99)`; // text-gray-600
  }
  if (mode === `dark`) {
    return `rgb(226 232 240)`; // text-slate-200
  }
};

const AreaGraph = ({className = css``}) => {
  const {activeLocationName} = useRecoilValue(locationSelectorState);

  const [margin, setMargin] = useState({
    top: 50,
    right: 60,
    left: 60,
    bottom: 10,
  });

  const niceData = useMemo(() => {
    return tidy(
      data,
      map((item) => {
        return {
          winery: item.winery,
          location: item.location,
          wine: item.wine,
          id: item.id,
          price: item.price,
          average: Number(item.rating.average),
          reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
        };
      }),
      groupBy(
        ['location'],
        [mutate({key: (d) => `\${d.location}`})],
        groupBy.entries()
      ),
      filter(([key, value]) => {
        return key !== '';
      })
    );
  }, []);

  const selectedData = useMemo(() => {
    return tidy(
      niceData,
      filter(([key, value]) => {
        return key === activeLocationName;
      }),
      map(([key, value]) => {
        return value;
      })
    ).flat();
  }, [niceData, activeLocationName]);

  // https://recharts.org/en-US/api/AreaChart
  return (
    <div className={cx('w-full', className)}>
      <ReviewGraph selectedData={selectedData} />
      <Spacer />
      <AverageGraph selectedData={selectedData} />
      <Spacer />
      <PriceGraph selectedData={selectedData} />
    </div>
  );
};

export default AreaGraph;
