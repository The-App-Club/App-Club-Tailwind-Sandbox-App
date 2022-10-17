import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {useMemo} from 'react';
import {FiEye} from 'react-icons/fi';
import {GiGrapes, GiPriceTag} from 'react-icons/gi';
import {MdHistory} from 'react-icons/md';
import {useRecoilState} from 'recoil';

import dataUsers from '@/data/users.json';
import dataWineries from '@/data/wineries.json';
import dataWines from '@/data/wines.json';
import wineState from '@/stores/wineStore';
import {formatRelativeTime} from '@/utils/dateUtil';

const GalleryItem = ({item}) => {
  const router = useRouter();
  const [_, setActiveWine] = useRecoilState(wineState);

  const activeWinery = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWineries.find((d) => {
      return d.wineryId === item.wineryId;
    });
  }, [item]);
  const matchedUser = useMemo(() => {
    if (!item) {
      return;
    }
    return dataUsers.find((user) => {
      return user.userId === item.userId;
    });
  }, [item]);

  if (!activeWinery) {
    return;
  }

  if (!matchedUser) {
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
        const activeWine = dataWines.find((d) => {
          return d.id === Number(item.wineId);
        });
        setActiveWine({
          activeWine,
        });
        router.push({
          pathname: `/wineries/${item.wineryId}/stories/${item.storyId}`,
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
            background-image: url(${item.thumbnail});
            background-size: contain;
            background-position: center center;
            background-origin: center center;
            background-repeat: no-repeat;
          }
        `}
      />
      <div className="w-full">
        <h2 className={cx('text-xl line-clamp-2')}>{item.storyTitle}</h2>
      </div>

      <div
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          router.push({
            pathname: `/users/${matchedUser.userId}`,
          });
        }}
      >
        <div className="flex items-center gap-1">
          <picture className={css``}>
            <source srcSet={`${matchedUser.avatorURL}`} type={`image/png`} />
            <img
              src={`${matchedUser.avatorURL}`}
              alt={matchedUser.userName}
              width={40}
              height={40}
              className={`rounded-full border-2`}
            />
          </picture>

          <span className="text-sm font-bold hover:underline">{`${matchedUser.userName}`}</span>
        </div>
      </div>

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
        <span className="text-sm">{activeWinery.wineryName}</span>
      </div>

      <div className={cx(`text-sm font-bold flex items-center`)}>
        <MdHistory
          size={24}
          className={css`
            min-width: 24px;
          `}
        />
        <span className="text-sm">{formatRelativeTime(item.createdAt)}</span>
      </div>
      <div className={cx(`text-sm font-bold flex items-center`)}>
        <FiEye
          size={24}
          className={css`
            min-width: 24px;
          `}
        />
        <span className="text-sm">{`${numbro(item.pageViews).format({
          average: true,
        })} views`}</span>
      </div>
      <div className={cx(`text-sm font-bold flex items-center`)}>
        <GiPriceTag
          size={24}
          className={css`
            min-width: 24px;
          `}
        />
        <span className="text-sm">{`$${numbro(item.awardsPrice).format({
          average: true,
        })} sales amount`}</span>
      </div>
    </div>
  );
};

export default GalleryItem;
