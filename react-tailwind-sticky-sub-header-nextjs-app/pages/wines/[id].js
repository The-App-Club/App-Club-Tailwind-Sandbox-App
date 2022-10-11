import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useCallback, useMemo} from 'react';
import {motion} from 'framer-motion';
import data from '../../data/wines.json';
import dataWineries from '../../data/wineries.json';
import capitalize from 'capitalize-the-first-letter';
import Sidebar from '../../components/Sidebar';
import hamburgerState from '../../stores/hamburgerStore';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Category from '../../components/Category';
import Tracer from '../../components/Tracer';
import {arrange, desc, filter, map, sliceHead, tidy} from '@tidyjs/tidy';
import ReviewRanking from '../../components/ReviewRanking';
import {default as numbro} from 'numbro';
import TraceFooter from '../../components/TraceFooter';
import Product from '../../components/Product';

import {GiGrapes} from 'react-icons/gi';
import {MdOutlineHistory, MdOutlineLocationOn} from 'react-icons/md';

import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {BiCameraMovie} from 'react-icons/bi';
import {FaRegComments} from 'react-icons/fa';
import useCart from '../../hooks/useCart';

const Wine = () => {
  const router = useRouter();
  const {addCart, removeCart, isCarted} = useCart();
  const {opened} = useRecoilValue(hamburgerState);
  const {id} = router.query;

  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  const relativedLocationData = useMemo(() => {
    if (!item) {
      return [];
    }
    return tidy(
      data,
      filter((d) => {
        return d.location === item.location && d.id !== Number(item.id);
      })
    );
  }, [item]);

  const relativedWineryData = useMemo(() => {
    if (!item) {
      return [];
    }
    return tidy(
      data,
      filter((d) => {
        return d.winery === item.winery && d.id !== Number(item.id);
      })
    );
  }, [item]);

  const handleAddCart = (e) => {
    addCart({focusedItem: item});
  };

  const handleRemoveCart = (e) => {
    removeCart({focusedItem: item});
  };

  if (!item) {
    return;
  }

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
              if (niceTitle === id) {
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
                align-items: flex-start;
                gap: 0.5rem;
              `,
              `bg-white dark:bg-slate-700 shadow-md p-2`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex flex-col justify-start gap-1`,
                css`
                  @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                  }
                `
              )}
            >
              {item.wine}
              <span
                className={cx(
                  `text-sm font-bold flex items-center gap-1`,
                  `hover:cursor-pointer hover:underline`
                )}
                onClick={(e) => {
                  const activeWineryItem = dataWineries.find((d) => {
                    return d.wineryName === item.winery;
                  });
                  router.push({
                    pathname: `/winery/${activeWineryItem.wineryId}`,
                  });
                }}
              >
                <GiGrapes
                  size={24}
                  className={css`
                    min-width: 24px;
                  `}
                />
                {`${item.winery}`}
              </span>
              <span className="text-sm font-bold flex items-center gap-1">
                <MdOutlineLocationOn
                  size={24}
                  className={css`
                    min-width: 24px;
                  `}
                />
                {`${item.location}`}
              </span>
              <div className="w-full flex items-center gap-2">
                <span
                  className={cx(
                    `text-sm font-bold flex items-center gap-1`,
                    `hover:cursor-pointer hover:underline`
                  )}
                  onClick={(e) => {
                    router.push({
                      pathname: `/wines/${id}/story`,
                    });
                  }}
                >
                  <MdOutlineHistory
                    size={24}
                    className={css`
                      min-width: 24px;
                    `}
                  />
                  {`See story`}
                </span>
                <span
                  className={cx(
                    `text-sm font-bold flex items-center gap-1`,
                    `hover:cursor-pointer hover:underline`
                  )}
                  onClick={(e) => {
                    router.push({
                      pathname: `/wines/${id}/comment`,
                    });
                  }}
                >
                  <FaRegComments
                    size={24}
                    className={css`
                      min-width: 24px;
                    `}
                  />
                  {`See comment`}
                </span>
              </div>
            </h2>
            <motion.div className="flex items-start gap-2 flex-col">
              {isCarted({focusedItem: item}) ? (
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
                  onClick={handleRemoveCart}
                >
                  Remove Cart
                </button>
              ) : (
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
                  onClick={handleAddCart}
                >
                  Add Cart
                </button>
              )}
              <div className="w-full">
                <div className="text-xl w-full">{`$${numbro(item.price).format({
                  thousandSeparated: true,
                })}`}</div>
                <div className="text-xl text-rose-400 dark:text-amber-400">
                  {item.rating.average}
                </div>
                <div className="text-sm">{item.rating.reviews}</div>
              </div>
            </motion.div>
          </div>
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
              <Product item={item} className={`shadow-2xl rounded-2xl`} />
              <Spacer height="3rem" />
              {relativedLocationData.length !== 0 && (
                <>
                  <Spacer />
                  <h2 className="text-xl flex items-center gap-1">
                    <MdOutlineLocationOn size={28} />
                    Relatived Location Wines
                  </h2>
                  <Splide
                    options={{
                      rewind: false,
                      pagination: false,
                      perPage: 1,
                      gap: '1rem',
                      padding: 0,
                      // padding: `10rem`,
                      breakpoints: {
                        768: {
                          padding: 0,
                        },
                      },
                      height: 'auto',
                    }}
                    aria-label="Relatived Location Wines"
                    className={cx(
                      css`
                        .splide__arrow--prev {
                          left: 0;
                        }
                        .splide__arrow--next {
                          right: 0;
                        }
                      `
                    )}
                  >
                    {relativedLocationData.map((item, index) => {
                      return (
                        <SplideSlide
                          key={index}
                          className={cx(
                            css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              flex-direction: column;
                            `,
                            `hover:cursor-pointer`,
                            `hover:bg-gray-100 dark:hover:bg-slate-800`
                          )}
                          onClick={(e) => {
                            router.push({
                              pathname: `/wines/${item.id}`,
                            });
                          }}
                        >
                          <Product item={item} />
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </>
              )}

              {relativedWineryData.length !== 0 && (
                <>
                  <Spacer />
                  <h2 className="text-xl flex items-center gap-1">
                    <GiGrapes size={28} />
                    Relatived Winery Wines
                  </h2>
                  <Splide
                    options={{
                      rewind: false,
                      pagination: false,
                      perPage: 1,
                      gap: '1rem',
                      padding: 0,
                      // padding: `10rem`,
                      breakpoints: {
                        768: {
                          padding: 0,
                        },
                      },
                      height: 'auto',
                    }}
                    aria-label="Relatived Winery Wines"
                    className={cx(
                      css`
                        .splide__arrow--prev {
                          left: 0;
                        }
                        .splide__arrow--next {
                          right: 0;
                        }
                      `
                    )}
                  >
                    {relativedWineryData.map((item, index) => {
                      return (
                        <SplideSlide
                          key={index}
                          className={cx(
                            css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              flex-direction: column;
                            `,
                            `hover:cursor-pointer`,
                            `hover:bg-gray-100 dark:hover:bg-slate-800`
                          )}
                          onClick={(e) => {
                            router.push({
                              pathname: `/wines/${item.id}`,
                            });
                          }}
                        >
                          <Product item={item} />
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </>
              )}
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
