import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {useEffect, useState} from 'react';
import {GiPriceTag} from 'react-icons/gi';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {useRecoilValue} from 'recoil';
import {useDebouncedCallback} from 'use-debounce';

import {
  decideAxisTickFillColor,
  decideBarBackFaceFillColor,
} from '@/components/AreaGraph';
import themeState from '@/stores/themeStore';

const PriceGraph = ({selectedData}) => {
  const router = useRouter();
  const {mode} = useRecoilValue(themeState);
  const [margin, setMargin] = useState({
    top: 50,
    right: 60,
    left: 60,
    bottom: 10,
  });

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

  return (
    <div
      className={`w-full border-2 shadow-2xl bg-white dark:bg-slate-700/90 rounded-xl`}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 border-b-2 mb-2 px-2`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <GiPriceTag size={24} />
        Price
      </h2>
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

export default PriceGraph;
