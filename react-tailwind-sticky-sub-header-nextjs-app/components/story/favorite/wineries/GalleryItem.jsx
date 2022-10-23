import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {default as numbro} from 'numbro';
import {GiGrapes} from 'react-icons/gi';
import {MdFavoriteBorder} from 'react-icons/md';
import {useSetRecoilState} from 'recoil';

import useStory from '@/hooks/useStory';
import useWinery from '@/hooks/useWinery';
import wineryState from '@/stores/wineryStore';

const GalleryItem = ({wineryId, stories}) => {
  const router = useRouter();
  const setWinery = useSetRecoilState(wineryState);
  const {getWriteUpUsers} = useStory();
  const {writeUpUsers} = getWriteUpUsers({stories});
  const {activeWinery} = useWinery({id: wineryId});

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
        <h2 className={cx('text-xl line-clamp-2')}>
          {`${activeWinery.wineryName}`}
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
