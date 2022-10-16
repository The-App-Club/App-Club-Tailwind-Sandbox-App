import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {useMemo} from 'react';
import {GiGrapes} from 'react-icons/gi';
import {
  MdOutlinePublish,
} from 'react-icons/md';
import {useRecoilState} from 'recoil';

import Spacer from '@/components/Spacer';
import dataWineries from '@/data/wineries.json';
import locationSelectorState from '@/stores/locationSelectorStore';

const GalleryItem = ({item}) => {
  const router = useRouter();
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const activeWinery = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWineries.find((d) => {
      return d.wineryId === item.wineryId;
    });
  }, [item]);

  if (!activeWinery) {
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
          pathname: `/story/wineries/${activeWinery.wineryId}/published`,
        });
      }}
    >
      {/* <GalleryItemFav item={activeWine} /> */}
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
              /* min-height: 56px; */
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
