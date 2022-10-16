import {css, cx} from '@emotion/css';
import GalleryItemFav from '@/components/story/wineries/[id]/GalleryItemFav';
import Spacer from '@/components/Spacer';
import {GiGrapes} from 'react-icons/gi';
import {
  MdOutlineLocationOn,
  MdOutlinePublish,
  MdOutlinePublishedWithChanges,
  MdUpdate,
} from 'react-icons/md';
import dataWines from '@/data/wines.json';
import dataStories from '@/data/stories.json';
import dataWineries from '@/data/wineries.json';
import {useRouter} from 'next/router';
import locationSelectorState from '@/stores/locationSelectorStore';
import {useRecoilState} from 'recoil';
import {formatRelativeTime} from '@/utils/dateUtil';
import {default as numbro} from 'numbro';
import {useMemo} from 'react';

const GalleryItem = ({item}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);

  const activeWine = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWines.find((d) => {
      return d.id === item.wineId;
    });
  }, [item]);

  if (!activeWine) {
    return;
  }

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
        router.push({
          pathname: `/story/${activeWine.id}/published`,
        });
      }}
    >
      <GalleryItemFav item={activeWine} />
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
          <MdOutlinePublish
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          <span className="text-sm">{`${numbro(item.stories.length).format({
            thousandSeparated: true,
          })} stories published`}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
