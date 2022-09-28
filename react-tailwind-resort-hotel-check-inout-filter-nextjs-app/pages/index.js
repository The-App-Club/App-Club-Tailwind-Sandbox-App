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
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <Layout className={`mt-12`}>
      <section className="max-w-7xl m-auto">
        <h2 className="text-3xl flex items-center justify-center">
          施設をさがす
        </h2>
        <div className="w-full">
          <SearchForm />
        </div>
      </section>
    </Layout>
  );
  // return <Filter data={data} />;
};

export default Home;
