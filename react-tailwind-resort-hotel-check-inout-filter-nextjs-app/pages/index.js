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
        <CustomDatePicker />
        {/* <DefaultDatePicker /> */}
        {/* <form>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form> */}

      </section>
    </Layout>
  );
  // return <Filter data={data} />;
};

export default Home;
