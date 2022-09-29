import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {default as chance} from 'chance';
import data from '../data/wines.json';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  tidy,
  min,
  max,
  count,
  filter,
  summarize,
  sum,
  groupBy,
  mutate,
} from '@tidyjs/tidy';
import * as d3 from 'd3';
import Spacer from '../components/Spacer';
import Slider from '@mui/material/Slider';
import Filter from '../components/Filter';
import CustomDatePicker from '../components/CustomDatePicker';
import DefaultDatePicker from '../components/DefaultDatePicker';
import SearchForm from '../components/SearchForm';
import '@splidejs/react-splide/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import Card from '../components/Card';

const Home = () => {
  const groupedData = useMemo(() => {
    return tidy(
      data,
      groupBy(
        ['winery'],
        [mutate({key: (d) => `\${d.winery}`})],
        groupBy.entries()
      )
    ).filter(([key, value]) => {
      return key;
    });
  }, []);

  return (
    <Layout className={`mt-12`}>
      <section
        className={cx(
          `max-w-7xl m-auto`,
          css`
            @media (max-width: 600px) {
              padding: 0 0.5rem;
            }
          `
        )}
      >
        <Card />
      </section>
    </Layout>
  );

  return (
    <Layout className={`mt-12`}>
      <section
        className={cx(
          `max-w-7xl m-auto`,
          css`
            @media (max-width: 600px) {
              padding: 0 0.5rem;
            }
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">
          施設をさがす
        </h2>
        <div
          className={cx(
            css`
              width: 100%;
              position: sticky;
              top: 3rem;
              z-index: 3;
            `,
            `bg-white dark:bg-slate-700 py-2`
          )}
        >
          <SearchForm />
        </div>
        <div className="max-w-xl w-full m-auto">
          {groupedData.map(([key, value], i) => {
            return (
              <div key={i}>
                <h3
                  className={cx(
                    `text-2xl line-clamp-1`,
                    `bg-white dark:bg-slate-700 py-2`,
                    css`
                      width: 100%;
                      position: sticky;
                      z-index: 2;
                      top: 130px;
                      @media (max-width: 600px) {
                        top: 200px;
                      }
                    `
                  )}
                >
                  {key}
                </h3>
                <div
                  className={cx(
                    `flex items-start justify-center gap-4 mb-12`,
                    css`
                      @media (max-width: 600px) {
                        align-items: center;
                        flex-direction: column;
                      }
                      min-height: 240px;
                    `
                  )}
                >
                  <div
                    className={cx(css`
                      width: 100%;
                      max-width: 240px;
                      @media (max-width: 600px) {
                        max-width: 100%;
                      }
                    `)}
                  >
                    <picture>
                      <source
                        srcSet={`https://via.placeholder.com/240x180`}
                        type={`image/png`}
                      />
                      <img
                        src={'https://via.placeholder.com/240x180'}
                        alt={'eyecatch'}
                        className={css`
                          display: block;
                          max-width: 100%;
                          width: 100%;
                        `}
                      />
                    </picture>
                    <p className="line-clamp-2">{value[0].description}</p>
                  </div>
                  <div
                    className={cx(css`
                      width: 100%;
                      max-width: 320px;
                      @media (max-width: 600px) {
                        max-width: 100%;
                      }
                    `)}
                  >
                    <Splide
                      aria-label="Resort Hotel Gallery"
                      options={{
                        pagination: false,
                      }}
                    >
                      {value.map((item, j) => {
                        return (
                          <SplideSlide key={i + j}>
                            <picture>
                              <source
                                srcSet={`https://via.placeholder.com/320x180`}
                                type={`image/png`}
                              />
                              <img
                                src="https://via.placeholder.com/320x180"
                                alt="Image 1"
                                className={css`
                                  display: block;
                                  max-width: 100%;
                                  width: 100%;
                                `}
                              />
                            </picture>
                          </SplideSlide>
                        );
                      })}
                    </Splide>
                    {/* HERE reservation */}
                    <h2 className="font-bold">Availability in the last week</h2>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 flex items-center justify-center">
                        1
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        2
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        3
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        4
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        5
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        6
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        7
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
  // return <Filter data={data} />;
};

export default Home;
