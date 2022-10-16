import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import dataWineries from '@/data/wineries.json';
import {BsPencilSquare} from 'react-icons/bs';
import wineryState from '@/stores/wineryStore';
import {useRecoilState} from 'recoil';

const GalleryItem = ({item}) => {
  const [winery, setWinery] = useRecoilState(wineryState);

  const router = useRouter();
  if (!item) {
    return;
  }
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
        `border-2 p-2`,
        `hover:cursor-pointer`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`,
        css`
          width: 100%;
        `
      )}
      onClick={(e) => {
        router.push({
          pathname: `/wineries/${item.wineryId}`,
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
            background-image: url(https://via.placeholder.com/300x200);
            background-size: contain;
            background-position: center center;
            background-origin: center center;
            background-repeat: no-repeat;
          }
        `}
      >
        <div
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
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-xl">{item.wineryName}</h2>
        <div className="flex items-center w-full justify-end gap-2">
          <span className="text-md font-bold">{item.wines.length} type</span>
        </div>
        <p className="line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
