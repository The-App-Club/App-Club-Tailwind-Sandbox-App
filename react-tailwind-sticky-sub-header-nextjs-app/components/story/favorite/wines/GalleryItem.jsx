import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {GiGrapes} from 'react-icons/gi';
import {MdFavoriteBorder, MdOutlineLocationOn} from 'react-icons/md';
import {useSetRecoilState} from 'recoil';

import dataWineries from '@/data/wineries.json';
import useStory from '@/hooks/useStory';
import useWine from '@/hooks/useWine';
import locationSelectorState from '@/stores/locationSelectorStore';
import wineState from '@/stores/wineStore';

const GalleryItem = ({wineId, stories}) => {
  const router = useRouter();
  const setLocation = useSetRecoilState(locationSelectorState);
  const setActiveWine = useSetRecoilState(wineState);
  const {getWriteUpUsers} = useStory();
  const {writeUpUsers} = getWriteUpUsers({stories});
  const {activeWine} = useWine({id: wineId});

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
        <div className="relative flex gap-1 items-center justify-end">
          {writeUpUsers.map((user, index) => {
            return (
              <picture key={index}>
                <source srcSet={`${user.avatorURL}`} type={`image/png`} />
                <img
                  src={`${user.avatorURL}`}
                  alt={user.userName}
                  width={40}
                  height={40}
                  className={`rounded-full border-2`}
                />
              </picture>
            );
          })}
        </div>
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
              activeLocationId: activeWine.locationId,
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
