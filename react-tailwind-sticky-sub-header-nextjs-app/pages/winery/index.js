import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useMemo} from 'react';
import data from '../../data/wineries.json';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';

import hamburgerState from '../../stores/hamburgerStore';
import Category from '../../components/Category';

const Winery = () => {
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
                z-index: 2;
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
              if (title === 'winery') {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 2;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `,
              `bg-white dark:bg-slate-700`
            )}
          >
            <h2
              className={cx(
                `text-xl flex items-center justify-start line-clamp-1`,
                css``
              )}
            >
              Winery List
            </h2>
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
                    css`
                      width: 100%;
                    `
                  )}
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
                        background-image: url(https://via.placeholder.com/300x200);
                        background-size: contain;
                        background-position: center center;
                        background-origin: center center;
                        background-repeat: no-repeat;
                      }
                    `}
                  />
                  <div className="w-full">
                    <h2 className="text-xl">{item.wineryName}</h2>
                    <div className="flex items-center w-full justify-end gap-2">
                      {/* <span className="text-4xl text-rose-400 dark:text-amber-400">
                        {item.rating.average}
                      </span> */}
                      <span className="text-md font-bold">
                        {item.wines.length} type
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

export default Winery;