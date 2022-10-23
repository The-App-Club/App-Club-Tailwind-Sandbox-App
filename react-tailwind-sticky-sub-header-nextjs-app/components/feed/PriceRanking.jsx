import {css, cx} from '@emotion/css';
import {arrange, desc, map, sliceHead, tidy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {useMemo} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useSetRecoilState} from 'recoil';

import Tracer from '@/components/Tracer';
import dataWineries from '@/data/wineries.json';
import data from '@/data/wines.json';
import locationSelectorState from '@/stores/locationSelectorStore';

const PriceRanking = ({className}) => {
  const router = useRouter();
  const setLocation = useSetRecoilState(locationSelectorState);
  const rankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      data,
      arrange([desc('price')]),
      map((item) => {
        return {
          id: item.id,
          price: item.price,
          wine: item.wine,
          winery: item.winery,
          location: item.location,
          image: item.image,
        };
      }),
      sliceHead(5)
    );
  }, []);

  return (
    <Tracer title="Top5 Price" className={className}>
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
                  'w-8 h-8 bg-white dark:bg-slate-800 absolute top-2 left-2 rounded-full flex items-center justify-center border-2 border-gray-300',
                  css`
                    z-index: 1;
                  `
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
                <div
                  className={cx(
                    'text-sm font-bold flex items-center text-gray-700 dark:text-slate-300',
                    `hover:cursor-pointer hover:underline`
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    const activeWineryItem = dataWineries.find((d) => {
                      return d.wineryName === item.winery;
                    });
                    router.push({
                      pathname: `/wineries/${activeWineryItem.wineryId}`,
                    });
                  }}
                >
                  <GiGrapes
                    size={24}
                    className={css`
                      min-width: 24px;
                    `}
                  />
                  <span className="line-clamp-1">{`${item.winery}`}</span>
                </div>
                <div
                  className={cx(
                    'text-sm font-bold flex items-center text-gray-700 dark:text-slate-300',
                    `hover:cursor-pointer hover:underline`
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation({
                      activeLocationId: item.locationId,
                      activeLocationName: item.location,
                    });
                    router.push({
                      pathname: `/location`,
                    });
                  }}
                >
                  <MdOutlineLocationOn
                    size={24}
                    className={css`
                      min-width: 24px;
                    `}
                  />
                  <span className="line-clamp-1">{`${item.location}`}</span>
                </div>
                <span className="line-clamp-1 text-sm font-bold">{`$${numbro(
                  item.price
                ).format({
                  thousandSeparated: true,
                })}`}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Tracer>
  );
};

export default PriceRanking;
