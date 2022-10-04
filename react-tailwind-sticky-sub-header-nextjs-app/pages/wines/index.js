import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../../layouts/default';
import {tidy, summarize, sum, groupBy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';
import data from '../../data/wines.json';
import {useMemo} from 'react';
import capitalize from 'capitalize-the-first-letter';

import Sidebar from '../../components/Sidebar';
import hamburgerState from '../../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Category from '../../components/Category';

const Wines = () => {
  const router = useRouter();
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
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
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
              if (niceTitle === `Wines`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 3;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `,
              `bg-white dark:bg-slate-700`,
              css`
                @media (max-width: 768px) {
                  padding: 0.5rem 0;
                }
              `
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2`
              )}
            >
              Wines
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center">
                Filter
              </button>
            </div>
          </div>
          <Category />
          <div
            className={css`
              display: grid;
              gap: 0.5rem;
              grid-template-columns: repeat(4, 1fr);
              @media (max-width: 1200px) {
                grid-template-columns: repeat(2, 1fr);
              }
            `}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cx(
                    `border-2 p-2`,
                    `hover:cursor-pointer`,
                    `hover:bg-gray-100 dark:hover:bg-slate-800`,
                    css`
                      width: 100%;
                    `
                  )}
                  onClick={(e) => {
                    router.push({
                      pathname: `/wines/${item.id}`,
                    });
                  }}
                >
                  <div
                    className={css`
                      width: 100%;
                      height: 200px;
                      position: relative;
                      ::before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        content: '';
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        /* background-image: url(https://via.placeholder.com/300x200); */
                        background-image: url(${item.image});
                        background-size: contain;
                        background-position: center center;
                        background-origin: center center;
                        background-repeat: no-repeat;
                      }
                    `}
                  />
                  <div className="w-full">
                    <h2 className="text-xl line-clamp-1">{item.wine}</h2>
                    <div className="text-sm font-bold line-clamp-1 dark:text-gray-400">{`Produced by ${item.winery}`}</div>
                    <div className="text-sm font-bold line-clamp-1 dark:text-gray-400">{`@${item.location}`}</div>
                    <div className="flex items-center w-full justify-end gap-2">
                      <span className="text-sm text-rose-400 dark:text-amber-400">
                        {item.rating.reviews}
                      </span>
                      <span className="text-4xl text-rose-500 dark:text-amber-500">
                        {item.rating.average}
                      </span>
                    </div>
                    <p className="line-clamp-3">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Wines;
