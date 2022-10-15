import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import data from '../data/wines.json';
import {motion, transform} from 'framer-motion';
import {useMemo, useRef, useState} from 'react';
import Feeder from '@/components/feed/Feeder';
import Spacer from '@/components/Spacer';
import Header from '@/components/feed/Header';

// import {default as chance} from 'chance';

// const a = data.map((item) => {
//   const s = chance(item.wine + chance().country({full: true})).floating({
//     min: 0,
//     max: 5,
//   });
//   const l = chance(item.wine + chance().country({full: true})).floating({
//     min: 0,
//     max: 5,
//   });
//   return {
//     ...item,
//     taste: {
//       sweet: s,
//       dry: Number((5 - s).toFixed(4)),
//     },
//     dense: {
//       light: l,
//       full: Number((5 - l).toFixed(4)),
//     },
//     tannin: chance(item.wine).floating({min: 0, max: 5}),
//   };
// });

// console.log(JSON.stringify(a));

const Feed = () => {
  // https://winefolly.com/tips/what-is-wine-body-and-how-to-taste-it/
  const {opened} = useRecoilValue(hamburgerState);
  const containerDomRef = useRef(null);
  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12 px-2 pb-2`,
            css`
              position: absolute;
              top: 0;
              left: 18rem;
              max-width: calc(100% - 18rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                padding: 0 0.5rem;
                ol {
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }
              }
            `
          )}
        >
          <Breadcrumbs
            useDefaultStyle={true}
            replaceCharacterList={[{from: '.', to: ' '}]}
            containerClassName="bg-white dark:bg-slate-700"
            activeItemClassName={'text-gray-500 dark:text-slate-500'}
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Feed`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <Header />
          <Spacer />
          <Feeder />
        </section>
      </Layout>
    </>
  );
};

export default Feed;
