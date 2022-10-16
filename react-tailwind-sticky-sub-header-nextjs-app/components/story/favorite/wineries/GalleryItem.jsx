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
import GalleryItemFav from '@/components/story/favorite/wineries/GalleryItemFav';
import {useMemo} from 'react';
import Spacer from '@/components/Spacer';
import locationSelectorState from '@/stores/locationSelectorStore';
import wineryState from '@/stores/wineryStore';

const GalleryItem = ({wineryId, stories}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const [_, setWinery] = useRecoilState(wineryState);

  const activeWinery = useMemo(() => {
    return dataWineries.find((d) => {
      return d.wineryId === wineryId;
    });
  }, [wineryId]);

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
        setWinery({
          activeWinery,
        });
        router.push({
          pathname: `/story/favorite/wineries/${wineryId}`,
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
            background-image: url(${activeWinery.thumbnail});
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
          {`${activeWinery.wineryName}`}
        </h2>
        <Spacer height="0.5rem" />
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();

            router.push({
              pathname: `/wineries/${activeWinery.wineryId}`,
            });
          }}
        >
          <GiGrapes
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          <span className="break-words">{`${activeWinery.wineryName}`}</span>
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
