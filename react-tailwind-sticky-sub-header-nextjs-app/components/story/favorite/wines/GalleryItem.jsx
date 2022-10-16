import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {FiEye} from 'react-icons/fi';
import {GiGrapes, GiPriceTag} from 'react-icons/gi';
import {
  MdFavoriteBorder,
  MdHistory,
  MdOutlineLocationOn,
  MdOutlinePublish,
} from 'react-icons/md';
import {useRecoilState} from 'recoil';

import dataWines from '@/data/wines.json';
import dataWineries from '@/data/wineries.json';
import wineState from '@/stores/wineStore';
import {formatRelativeTime} from '@/utils/dateUtil';
import GalleryItemFav from '@/components/story/favorite/wines/GalleryItemFav';
import {useMemo} from 'react';
import Spacer from '@/components/Spacer';
import locationSelectorState from '@/stores/locationSelectorStore';

const GalleryItem = ({wineId, stories}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const [_, setActiveWine] = useRecoilState(wineState);

  const activeWine = useMemo(() => {
    return dataWines.find((d) => {
      return d.id === wineId;
    });
  }, [wineId]);

  // console.log(`wineId, stories`, activeWine, stories);
  // return null;

  return (
    <div
      className={cx(
        `relative`,
        `w-full border-2 p-2`,
        `hover:cursor-pointer`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`
      )}
      onClick={(e) => {
        e.stopPropagation();
        setActiveWine({
          activeWine,
        });
        router.push({
          pathname: `/story/favorite/wines/${wineId}`,
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
            background-image: url(${activeWine.image});
            background-size: contain;
            background-position: center center;
            background-origin: center center;
            background-repeat: no-repeat;
          }
        `}
      />

      <div className="w-full">
        <h2
          className={cx(
            'text-xl line-clamp-2',
            css`
              min-height: 56px;
            `
          )}
        >
          {`${activeWine.wine}`}
        </h2>
        <Spacer height="0.5rem" />
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();
            const activeWineryItem = dataWineries.find((d) => {
              return d.wineryName === activeWine.winery;
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
          <span className="break-words">{`${activeWine.winery}`}</span>
        </div>
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();
            setLocation({
              activeLocationName: activeWine.location,
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
          <span className="break-words">{`${activeWine.location}`}</span>
        </div>
        <div className={cx(`text-sm font-bold flex items-center`)}>
          <MdFavoriteBorder
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          <span className="text-sm">{`${numbro(stories.length).format({
            thousandSeparated: true,
          })} stories favorited`}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
