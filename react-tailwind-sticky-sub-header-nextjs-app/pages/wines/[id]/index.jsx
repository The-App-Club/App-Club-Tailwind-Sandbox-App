import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {filter, tidy} from '@tidyjs/tidy';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useMemo} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useRecoilValue} from 'recoil';

import Sidebar from '@/components/wines/[id]/Sidebar';
import Spacer from '@/components/Spacer';
import ReviewRanking from '@/components/feed/ReviewRanking';
import '@splidejs/react-splide/css';

import Header from '@/components/wines/[id]/Header';
import Product from '@/components/wines/[id]/Product';
import TraceFooter from '@/components/wines/[id]/TraceFooter';
import data from '@/data/wines.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import RelativedLocationWineSlider from '@/components/wines/[id]/RelativedLocationWineSlider';
import RelativedWineryWineSlider from '@/components/wines/[id]/RelativedWineryWineSlider';

const Wine = () => {
  const router = useRouter();
  const {id} = router.query;
  const {opened} = useRecoilValue(hamburgerState);
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
                position: initial;
                top: initial;
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                ol {
                  font-size: 0.875rem /* 14px */;
                  line-height: 1.25rem /* 20px */;
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
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
              if (niceTitle === id) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />
          <Spacer />
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 2rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <div className="w-full max-w-2xl">
              <Product className={`shadow-2xl rounded-2xl`} />
              <Spacer height="3rem" />
              <RelativedLocationWineSlider />
              <RelativedWineryWineSlider />
            </div>
            <ReviewRanking
              className={css`
                position: sticky;
                top: calc(3rem + 3rem + 136px + 16px);
                z-index: 1;
              `}
            />
          </div>
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Wine;
