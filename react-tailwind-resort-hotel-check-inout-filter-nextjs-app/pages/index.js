import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {default as chance} from 'chance';
import data from '../data/wines.json';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {tidy, min, max, count, filter, summarize, sum} from '@tidyjs/tidy';
import * as d3 from 'd3';
import Spacer from '../components/Spacer';
import Slider from '@mui/material/Slider';
import Filter from '../components/Filter';
import CustomDatePicker from '../components/CustomDatePicker';
import DefaultDatePicker from '../components/DefaultDatePicker';

const Home = () => {
  return (
    <Layout className={`mt-12`}>
      <section className="max-w-7xl m-auto">
        <h2 className="text-3xl flex items-center justify-center">
          施設をさがす
        </h2>
        <div className="w-full">
          <form
            className={cx(
              'w-full flex items-center justify-center gap-2',
              css`
                @media (max-width: 768px) {
                  flex-direction: column;
                }
              `
            )}
          >
            <div className="w-80">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                エリア
              </label>
              <select
                id="countries"
                className={cx(
                  `block w-full px-3 py-2`,
                  `text-gray-900 dark:text-white text-sm font-medium`,
                  `shadow-sm border rounded-lg border-gray-300 dark:border-gray-600`,
                  `focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 focus:border-blue-500`,
                  `bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400`
                )}
              >
                <option selected value="ALL">
                  すべてのエリア
                </option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <CustomDatePicker />
          </form>
        </div>
      </section>
    </Layout>
  );
  // return <Filter data={data} />;
};

export default Home;
