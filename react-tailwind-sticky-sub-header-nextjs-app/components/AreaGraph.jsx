import {cx, css} from '@emotion/css';
import {filter, groupBy, map, mutate, tidy} from '@tidyjs/tidy';
import {useEffect, useMemo, useState} from 'react';
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
import winerySelectorState from '../stores/winerySelectorStore';
import WinerySelector from './WinerySelector';
import Spacer from './Spacer';
import {default as numbro} from 'numbro';
import themeState from '../stores/themeStore';
import {useRouter} from 'next/router';

const AreaGraph = () => {
  const router = useRouter();
  const {mode} = useRecoilValue(themeState);
  const {activeWineryName} = useRecoilValue(winerySelectorState);
  const [value, setValue] = useState([0, 14]);

  const niceData = useMemo(() => {
    const [from, to] = value;
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
        return key !== '' && from <= value.length && value.length <= to;
      })
    );
  }, [value]);

  const handleChange = (event, newValue) => {
    const [a, b] = newValue;
    if (a === b) {
      return;
    }
    setValue(newValue);
  };

  // const maxRangeValue = useMemo(() => {
  //   return Math.max(
  //     ...[
  //       ...niceData.map(([key, value]) => {
  //         return value;
  //       }),
  //     ].map((item) => {
  //       return item.length;
  //     })
  //   );
  // }, [niceData]);

  const wineryNames = useMemo(() => {
    return tidy(
      niceData,
      map(([key, value]) => {
        return {
          name: key,
        };
      })
    );
  }, [niceData]);

  const selectedData = useMemo(() => {
    return tidy(
      niceData,
      filter(([key, value]) => {
        return key === activeWineryName;
      }),
      map(([key, value]) => {
        return value;
      })
    ).flat();
  }, [niceData, activeWineryName]);

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

  // https://recharts.org/en-US/api/AreaChart
  return (
    <div className="max-w-6xl w-full px-6">
      <h3 className="text-xl">ワイナリーの存在個数</h3>
      <Spacer height="2rem" />
      <Slider
        min={0}
        max={14}
        step={1}
        getAriaLabel={() => {
          return `Winery exists count range`;
        }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => {
          return `${value}`;
        }}
      />
      <Spacer />
      <h3 className="text-xl">ワイナリーの存在場所</h3>
      <WinerySelector data={wineryNames} />
      <Spacer />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={{
            top: 50,
            right: 60,
            left: 60,
            bottom: 10,
          }}
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
          margin={{
            top: 50,
            right: 60,
            left: 60,
            bottom: 10,
          }}
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
          margin={{
            top: 50,
            right: 60,
            left: 60,
            bottom: 10,
          }}
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
