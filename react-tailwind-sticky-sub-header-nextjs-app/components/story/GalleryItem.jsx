import {css, cx} from '@emotion/css';
import GalleryItemFav from '@/components/story/GalleryItemFav';
import Spacer from '../Spacer';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn, MdUpdate} from 'react-icons/md';
import dataWineries from '@/data/wineries.json';
import {useRouter} from 'next/router';
import locationSelectorState from '@/stores/locationSelectorStore';
import {useRecoilState} from 'recoil';
import {formatRelativeTime} from '@/utils/dateUtil';

const GalleryItem = ({item}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);

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
          pathname: `/story/${item.storyId}`,
        });
      }}
    >
      <GalleryItemFav item={item} />
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
            background-image: url(${item.image});
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
          {item.title}
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
          <span className="break-words">{`${item.winery}`}</span>
        </div>
        <div
          className={cx(
            `text-sm font-bold flex items-center`,
            `hover:cursor-pointer hover:underline`
          )}
          onClick={(e) => {
            e.stopPropagation();
            setLocation({
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
          <span className="break-words">{`${item.location}`}</span>
        </div>
        <div className={cx(`text-sm font-bold flex items-center`)}>
          <MdUpdate
            size={24}
            className={css`
              min-width: 24px;
            `}
          />
          <span className="text-sm">{formatRelativeTime(item.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
