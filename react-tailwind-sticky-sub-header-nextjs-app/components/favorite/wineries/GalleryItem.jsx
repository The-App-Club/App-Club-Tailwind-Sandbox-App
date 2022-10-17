import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import {GiGrapes} from 'react-icons/gi';
import {useRecoilState} from 'recoil';

import GalleryItemFav from './GalleryItemFav';

import Spacer from '@/components/Spacer';
import wineryState from '@/stores/wineryStore';

const GalleryItem = ({item}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [winery, setWinery] = useRecoilState(wineryState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const handleNewStory = (e) => {
    e.stopPropagation();
    setWinery({
      activeWinery: item,
    });

    router.push({
      pathname: `/story/wineries/${item.wineryId}/create`,
    });
  };

  return (
    <div
      className={cx(
        `relative`,
        `w-full border-2 p-2`,
        `hover:cursor-pointer`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`
      )}
      onClick={(e) => {
        router.push({
          pathname: `/wineries/${item.wineryId}`,
        });
      }}
    >
      {isClient && <GalleryItemFav item={item} />}
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
      >
        {/* <div
          className={cx(
            'absolute bottom-2 right-0 flex items-center',
            css`
              z-index: 1;
            `
          )}
          onClick={handleNewStory}
        >
          <BsPencilSquare
            size={32}
            fill={`rgb(209 213 219)`} // bg-gray-300
          />
        </div> */}
      </div>
      <div className="w-full">
        <h2
          className={cx(
            'text-xl line-clamp-2',
            css`
              min-height: 56px;
            `
          )}
        >
          {item.wineryName}
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
          <span className="break-words">{`${item.wineryName}`}</span>
        </div>
        <p className="text-sm line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

export default memo(GalleryItem);
