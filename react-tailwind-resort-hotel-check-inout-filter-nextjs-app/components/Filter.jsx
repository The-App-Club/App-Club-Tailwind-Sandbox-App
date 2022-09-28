import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {default as chance} from 'chance';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {tidy, min, max, count, filter, summarize, sum} from '@tidyjs/tidy';
import * as d3 from 'd3';
import Spacer from '../components/Spacer';
import Slider from '@mui/material/Slider';

const Filter = ({data}) => {
  const priceRange = useMemo(() => {
    return {
      min: tidy(data, min('price')),
      max: tidy(data, max('price')),
      count: tidy(data, count('id')).length,
    };
  }, [data]);

  const width = useMemo(() => {
    return 320;
  }, []);

  const piece = useMemo(() => {
    // return 7;
    // return 10;
    return 13;
    // return 18;
  }, []);

  const [value, setValue] = useState([0, piece]);

  const priceUnit = useMemo(() => {
    return (priceRange.max - priceRange.min) / piece;
  }, [priceRange, piece]);

  const nuts = useMemo(() => {
    return [...Array(piece + 1)].map((_, index) => {
      return index;
    });
  }, [piece]);

  const priceRangePairs = useMemo(() => {
    return d3.pairs(nuts).map(([fromIndex, toIndex], index) => {
      const fromValue = fromIndex * priceUnit + priceRange.min;
      const toValue = Math.min(
        toIndex * priceUnit + priceRange.min,
        priceRange.max
      );
      return {
        fromPrice: fromValue,
        toPrice: toValue,
        amount: tidy(
          data,
          filter((d) => {
            return fromValue <= d.price && d.price <= toValue;
          }),
          count('id')
        ).length,
      };
    });
  }, [nuts, priceUnit, priceRange, data]);

  const heightScaler = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([
        tidy(priceRangePairs, min('amount')),
        tidy(priceRangePairs, max('amount')),
      ])
      .range([width / 2, width]);
  }, [priceRangePairs, width]);

  const niceData = useMemo(() => {
    return priceRangePairs.map((item) => {
      return {
        ...item,
        width: width / piece,
        height: heightScaler(item.amount),
      };
    });
  }, [priceRangePairs, heightScaler, piece, width]);

  const isActiveBar = useCallback(
    (index) => {
      const [min, max] = value;
      return min <= index && index <= max - 1;
    },
    [value]
  );

  const valuetext = (value) => {
    return `$${value}`;
  };

  const handleChange = (event, newValue) => {
    const [a, b] = newValue;
    if (a === b) {
      return;
    }
    setValue(newValue);
  };

  const [leastPrice, largestPrice, matchedCount] = useMemo(() => {
    const [minIndex, maxIndex] = value;
    const data = priceRangePairs.slice(minIndex, maxIndex);
    console.log(data);
    return [
      Math.min(tidy(data, min('fromPrice')), tidy(data, min('toPrice'))),
      Math.max(tidy(data, max('fromPrice')), tidy(data, max('toPrice'))),
      tidy(data, sum('amount')),
    ];
  }, [value, priceRangePairs]);

  return (
    <Layout className={`mt-12`}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full`,
          css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">Home</h2>

        <Spacer />

        <div
          className={css`
            width: ${width}px;
          `}
        >
          <div className={cx(css``, `w-full flex items-end gap-1`)}>
            {niceData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cx(
                    css`
                      width: ${item.width}px;
                      height: ${item.height}px;
                    `,
                    `${
                      isActiveBar(index)
                        ? 'bg-slate-400 dark:bg-yellow-300'
                        : 'bg-slate-300'
                    }`
                  )}
                />
              );
            })}
          </div>
          <Slider
            min={0}
            max={piece}
            step={1}
            getAriaLabel={() => {
              return `Price range`;
            }}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-gray-700 dark:text-gray-200">{`最低価格`}</span>
              <span className="font-bold">{`${Math.floor(leastPrice)}円`}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-700 dark:text-gray-200">{`マッチ件数`}</span>
              <span className="font-bold">{`${matchedCount}件`}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-700 dark:text-gray-200">{`最高価格`}</span>
              <span className="font-bold">{`${Math.floor(
                largestPrice
              )}円`}</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Filter;
