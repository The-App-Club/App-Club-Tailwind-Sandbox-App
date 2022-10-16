import * as d3 from 'd3';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10} from 'd3-scale-chromatic';
import {useEffect, useState} from 'react';
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {useRecoilValue} from 'recoil';
import useSWR from 'swr';
import {useDebouncedCallback} from 'use-debounce';

import {default as XFeatureColumnSelector,default as YFeatureColumnSelector} from '@/components/FeatureColumnSelector';
import featureColumnSelectorState from '@/stores/featureColumnSelectorStore';
import themeState from '@/stores/themeStore';


const colors = scaleOrdinal(schemeCategory10).range();

const decideAxisTickFillColor = ({mode}) => {
  if (mode === `light`) {
    return `rgb(75 85 99)`; // text-gray-600
  }
  if (mode === `dark`) {
    return `rgb(226 232 240)`; // text-slate-200
  }
};

const decideTooltipBackFaceFillColor = ({mode}) => {
  if (mode === `light`) {
    return `rgb(31 41 55)`; // bg-gray-800
  }
  if (mode === `dark`) {
    return `rgb(209 213 219)`; // bg-gray-300
  }
};

const ScatterGraph = () => {
  const {mode} = useRecoilValue(themeState);

  const {xColumnName, yColumnName} = useRecoilValue(featureColumnSelectorState);

  const [margin, setMargin] = useState({
    top: 50,
    right: 60,
    left: 60,
    bottom: 10,
  });

  const {data, error} = useSWR(`wine`, async (key) => {
    try {
      const response = await d3.csv('/data/wine.csv');
      const columns = response.columns;
      return {
        items: response.map((item, index) => {
          return Object.entries(item).reduce((acc, [key, value]) => {
            return Object.assign(acc, {
              [key]: +value,
            });
          }, {});
        }),
        columns: columns.map((column) => {
          return {
            name: column,
          };
        }),
      };
    } catch (error) {
      return error;
    }
  });

  const handleResize = useDebouncedCallback((e) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMargin({
        top: 20,
        right: 20,
        bottom: 20,
        left: 5,
      });
      return;
    }
    setMargin({
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    });
  }, 600);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (!data) {
    return <p>loading...</p>;
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-start gap-2 w-full">
        <div className="w-full">
          <label>XColumn</label>
          <XFeatureColumnSelector data={data.columns} isX={true} />
        </div>
        <div className="w-full">
          <label>YColumn</label>
          <YFeatureColumnSelector data={data.columns} isX={false} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          width={500}
          height={300}
          margin={margin}
          className={`shadow-2xl bg-white dark:bg-slate-700/90 rounded-xl`}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey={xColumnName}
            name={xColumnName}
            unit=""
            tick={{fill: decideAxisTickFillColor({mode})}}
          />
          <YAxis
            type="number"
            dataKey={yColumnName}
            name={yColumnName}
            unit=""
            tick={{fill: decideAxisTickFillColor({mode})}}
          />
          <Tooltip
            cursor={{
              strokeDasharray: '3 3',
              stroke: decideTooltipBackFaceFillColor({mode}),
            }}
            // wrapperClassName={`!bg-white dark:!bg-slate-700 !border-gray-100 dark:!border-slate-700 shadow-2xl`}
            labelClassName={`dark:!text-black`}
            labelFormatter={(label, [item]) => {
              return `#${item?.payload.Wine}`;
            }}
            formatter={(value) => {
              return `${value}`;
            }}
          />
          <Scatter
            name="Wine Plot"
            data={data.items}
            fill="#8884d8"
            className="text-white"
          >
            {data.items?.map((entry, index) => {
              return <Cell key={`cell-${index}`} fill={colors[entry.Wine]} />;
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterGraph;
