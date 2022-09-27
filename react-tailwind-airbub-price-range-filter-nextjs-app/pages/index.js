import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {default as chance} from 'chance';
import data from '../data/wines.json';
import {useMemo, useState} from 'react';
import {tidy, min, max, count, filter} from '@tidyjs/tidy';
import * as d3 from 'd3';
import Spacer from '../components/Spacer';

const Home = () => {
  const [minStep, setMinStep] = useState(3);
  const [maxStep, setMaxStep] = useState(5);

  const priceRange = useMemo(() => {
    return {
      min: tidy(data, min('price')),
      max: tidy(data, max('price')),
      count: tidy(data, count('id')).length,
    };
  }, []);

  const piece = useMemo(() => {
    return 10;
  }, []);

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
  }, [nuts, priceUnit, priceRange]);

  const d3Scaler = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([
        tidy(priceRangePairs, min('amount')),
        tidy(priceRangePairs, max('amount')),
      ])
      .range([30, 320]);
  }, [priceRangePairs]);

  const niceData = useMemo(() => {
    return priceRangePairs.map((item) => {
      return {
        ...item,
        width: 30,
        height: d3Scaler(item.amount),
      };
    });
  }, [priceRangePairs, d3Scaler]);

  const handleChangeMinStep = (e) => {
    if (maxStep <= Number(e.target.value)) {
      return;
    }
    setMinStep(Number(e.target.value));
  };
  const handleChangeMaxStep = (e) => {
    if (minStep >= Number(e.target.value)) {
      return;
    }
    setMaxStep(Number(e.target.value));
  };
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

        <div>
          <div className={cx(css``, `flex items-end gap-1`)}>
            {niceData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cx(
                    css`
                      width: ${item.width}px;
                      height: ${item.height}px;
                    `,
                    `bg-slate-300`
                  )}
                />
              );
            })}
          </div>
          <div
            className={css`
              position: relative;
            `}
          >
            <label
              htmlFor="default-range"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Default range
              <span>0 ~ 1000</span>
            </label>
            <input
              id="default-range"
              type="range"
              value={minStep}
              min={0}
              max={piece}
              step={1}
              className={cx(
                `w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700`,
                css`
                  ::-webkit-slider-thumb {
                    position: relative;
                    left: -0.25rem;
                  }
                  ::-moz-range-thumb {
                    position: relative;
                    left: -0.25rem;
                  }
                `
              )}
              onChange={handleChangeMinStep}
            />
            <input
              id="default-range"
              type="range"
              value={maxStep}
              min={0}
              max={piece}
              step={1}
              className={cx(
                `w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700`,
                css`
                  ::-webkit-slider-thumb {
                    position: relative;
                    right: -0.25rem;
                  }
                  ::-moz-range-thumb {
                    position: relative;
                    right: -0.25rem;
                  }
                `
              )}
              onChange={handleChangeMaxStep}
            />
          </div>
        </div>

        {/* <Link href={'/'}>
          <a className="hover:underline">Back to home</a>
        </Link>
        <Link href={'/wines'}>
          <a className="hover:underline">Go to wines</a>
        </Link> */}
      </section>
    </Layout>
  );
};

export default Home;
