import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {GiGrapes} from 'react-icons/gi';
import {useSetRecoilState} from 'recoil';

import Tracer from '@/components/Tracer';
import useWineryRanking from '@/hooks/useWineryRanking';
import locationSelectorState from '@/stores/locationSelectorStore';

const WineryRanking = ({className}) => {
  const router = useRouter();
  const setLocation = useSetRecoilState(locationSelectorState);
  const {wineryShipWinesRankingData: rankingData} = useWineryRanking();

  return (
    <Tracer title="Top5 Winery Shipped Wines" className={className}>
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
                  pathname: `/wineries/${item.wineryId}`,
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
                    background-image: url(${item.thumbnail});
                    background-size: contain;
                    background-position: center center;
                    background-origin: center center;
                    background-repeat: no-repeat;
                  }
                `}
              />
              <div className="flex items-start justify-start flex-col">
                <h2 className="line-clamp-1 font-bold">{item.wineryName}</h2>
                <div
                  className={cx(
                    'text-sm font-bold flex items-center text-gray-700 dark:text-slate-300',
                    `hover:cursor-pointer hover:underline`
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push({
                      pathname: `/wineries/${item.wineryId}`,
                    });
                  }}
                >
                  <GiGrapes
                    size={24}
                    className={css`
                      min-width: 24px;
                    `}
                  />
                  <span className="line-clamp-1">{`${item.wineryName}`}</span>
                </div>
                <span className="line-clamp-1 text-sm font-bold">
                  {item.winesCount} shipped wines
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Tracer>
  );
};

export default WineryRanking;
