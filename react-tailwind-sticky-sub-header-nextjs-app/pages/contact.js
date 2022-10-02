import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import Tracer from '../components/Tracer';
import {useMemo} from 'react';
import {arrange, desc, map, sliceHead, tidy} from '@tidyjs/tidy';
import data from '../data/wines.json';
import {useRouter} from 'next/router';

const Contact = () => {
  const router = useRouter();

  const {opened} = useRecoilValue(hamburgerState);

  const rankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      data,
      map((item) => {
        // return mergician(item, {
        //   rating: {
        //     average: Number(item.rating.average),
        //     reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
        //   },
        // });
        return {
          ...item,
          average: Number(item.rating.average),
          reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
          // rating: {
          //   average: Number(item.rating.average),
          //   reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
          // },
        };
      }),
      arrange([desc('reviews')]),
      map((item) => {
        return {
          id: item.id,
          wine: item.wine,
          winery: item.winery,
          location: item.location,
          image: item.image,
          reviews: item.rating.reviews,
        };
      }),
      sliceHead(5)
    );
  }, []);

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
              if (niceTitle === `Contact`) {
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
              className={cx(`text-3xl flex items-center justify-start`, css``)}
            >
              Contact
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center">
                Do1
              </button>
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center">
                Do2
              </button>
            </div>
          </div>
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
                  flex-direction: column;
                }
              `
            )}
          >
            <div className="w-full">
              <h2
                className={cx(`text-xl flex items-center justify-start`, css``)}
              >
                Content
              </h2>
            </div>
            <Tracer title="Top5 Reviews">
              <ul className="flex flex-col items-start gap-2">
                {rankingData.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={cx(
                        `w-full relative flex items-start gap-2 p-2`,
                        `hover:cursor-pointer`,
                        `hover:bg-gray-100 dark:hover:bg-slate-800`
                      )}
                      onClick={(e) => {
                        router.push({
                          pathname: `/wines/${item.id}`,
                        });
                      }}
                    >
                      <div
                        className={cx(
                          'w-8 h-8 bg-white dark:bg-slate-800 absolute top-2 left-2 rounded-full flex items-center justify-center border-2 border-gray-300'
                        )}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={css`
                          min-width: 100px;
                          height: 100px;
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
                            background-image: url(${item.image});
                            background-size: contain;
                            background-position: center center;
                            background-origin: center center;
                            background-repeat: no-repeat;
                          }
                        `}
                      />
                      <div className="flex items-start justify-start flex-col">
                        <h2 className="line-clamp-1 font-bold">{item.wine}</h2>
                        <span className="line-clamp-1 text-sm text-gray-700 dark:text-slate-300">
                          {item.winery}
                        </span>
                        <span className="line-clamp-1 text-sm text-gray-700 dark:text-slate-300">
                          @{item.location}
                        </span>
                        <span className="line-clamp-1 text-sm">
                          {item.reviews}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Tracer>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
