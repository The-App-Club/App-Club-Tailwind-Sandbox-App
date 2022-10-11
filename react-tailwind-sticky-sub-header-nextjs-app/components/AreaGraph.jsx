import {cx, css} from '@emotion/css';
import {filter, groupBy, map, mutate, tidy} from '@tidyjs/tidy';
import {useEffect, useMemo, useRef, useState} from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import Slider from '@mui/material/Slider';

import {useRecoilValue} from 'recoil';

import data from '../data/wines.json';
import locationSelectorState from '../stores/locationSelectorStore';
import LocationSelector from './LocationSelector';
import Spacer from './Spacer';
import {default as numbro} from 'numbro';
import themeState from '../stores/themeStore';
import {useRouter} from 'next/router';
import Map from './Map';

import {useDebouncedCallback} from 'use-debounce';

const AreaGraph = ({className = css``}) => {
  const router = useRouter();
  const {mode} = useRecoilValue(themeState);
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

  const decideBarBackFaceFillColor = ({mode}) => {
    if (mode === `light`) {
      return `rgb(243 244 246)`; // bg-gray-100
    }
    if (mode === `dark`) {
      return `rgb(30 41 59)`; // bg-slate-800
    }
  };

  const decideAxisTickFillColor = ({mode}) => {
    if (mode === `light`) {
      return `rgb(75 85 99)`; // text-gray-600
    }
    if (mode === `dark`) {
      return `rgb(226 232 240)`; // text-slate-200
    }
  };

  const handleResize = useDebouncedCallback((e) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMargin({
        top: 50,
        right: 10,
        left: 10,
        bottom: 10,
      });
      return;
    }
    setMargin({
      top: 50,
      right: 60,
      left: 60,
      bottom: 10,
    });
  }, 600);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // https://recharts.org/en-US/api/AreaChart
  return (
    <div className={cx('w-full', className)}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={margin}
          className={`shadow-2xl bg-white dark:bg-slate-700/90 rounded-xl`}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wine"
            angle={-45}
            textAnchor="end"
            fontSize={'10px'}
            tickFormatter={(value, index) => {
              return `#${selectedData[index]?.id}`;
            }}
            tick={{fill: decideAxisTickFillColor({mode})}}
          />
          <YAxis tick={{fill: decideAxisTickFillColor({mode})}} />
          <Tooltip
            wrapperClassName={`!bg-white dark:!bg-slate-700 !border-gray-100 dark:!border-slate-700 shadow-2xl`}
            labelClassName={`!bg-white dark:!bg-slate-700`}
            cursor={{
              fill: decideBarBackFaceFillColor({mode}),
            }}
            labelFormatter={(label, [item]) => {
              return `#${item?.payload.id} ${item?.payload.wine}`;
            }}
            formatter={(value) => {
              return value;
            }}
          />
          <Legend />
          {mode === `light` && (
            <Bar
              dataKey="reviews"
              fill="#630A10"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
          {mode === `dark` && (
            <Bar
              dataKey="reviews"
              fill="#FCF0C8"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      <Spacer />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={margin}
          className={`shadow-2xl bg-white dark:bg-slate-700/90 rounded-xl`}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wine"
            angle={-45}
            textAnchor="end"
            fontSize={'10px'}
            tickFormatter={(value, index) => {
              return `#${selectedData[index]?.id}`;
            }}
            tick={{fill: decideAxisTickFillColor({mode})}}
          />
          <YAxis tick={{fill: decideAxisTickFillColor({mode})}} />
          <Tooltip
            wrapperClassName={`!bg-white dark:!bg-slate-700 !border-gray-100 dark:!border-slate-700 shadow-2xl`}
            labelClassName={`!bg-white dark:!bg-slate-700`}
            cursor={{
              fill: decideBarBackFaceFillColor({mode}),
            }}
            labelFormatter={(label, [item]) => {
              return `#${item?.payload.id} ${item?.payload.wine}`;
            }}
            formatter={(value) => {
              return value;
            }}
          />
          <Legend />
          {mode === `light` && (
            <Bar
              dataKey="average"
              fill="#42855B"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
          {mode === `dark` && (
            <Bar
              dataKey="average"
              fill="#90B77D"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      <Spacer />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={margin}
          className={`shadow-2xl bg-white dark:bg-slate-700/90 rounded-xl`}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wine"
            angle={-45}
            textAnchor="end"
            fontSize={'10px'}
            tickFormatter={(value, index) => {
              return `#${selectedData[index]?.id}`;
            }}
            tick={{fill: decideAxisTickFillColor({mode})}}
          />
          <YAxis
            tick={{fill: decideAxisTickFillColor({mode})}}
            tickFormatter={(value, index) => {
              return `$${numbro(value).format({
                average: true,
              })}`;
            }}
          />
          <Tooltip
            cursor={{
              fill: decideBarBackFaceFillColor({mode}),
            }}
            wrapperClassName={`!bg-white dark:!bg-slate-700 !border-gray-100 dark:!border-slate-700 shadow-2xl`}
            labelClassName={`!bg-white dark:!bg-slate-700`}
            labelFormatter={(label, [item]) => {
              return `#${item?.payload.id} ${item?.payload.wine}`;
            }}
            formatter={(value) => {
              return `$${numbro(value).format({
                thousandSeparated: true,
              })}`;
            }}
          />
          <Legend />
          {mode === `light` && (
            <Bar
              dataKey="price"
              fill="#E26A2C"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
          {mode === `dark` && (
            <Bar
              dataKey="price"
              fill="#FFD07F"
              className="cursor-pointer"
              onClick={(e) => {
                router.push({
                  pathname: `/wines/${e?.id}`,
                });
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
