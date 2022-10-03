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

const AreaGraph = () => {
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
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="wine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviews" fill="#1C6758" />
        </BarChart>
      </ResponsiveContainer>
      <Spacer />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="wine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="average" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Spacer />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={selectedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="wine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
