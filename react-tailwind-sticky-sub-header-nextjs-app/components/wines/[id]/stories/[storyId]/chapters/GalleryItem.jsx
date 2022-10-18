import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';

import ShortHandMenu from '@/components/wines/[id]/stories/[storyId]/chapters/ShortHandMenu';
import wineryState from '@/stores/wineryStore';

const GalleryItem = ({item, chapterIndex}) => {
  const router = useRouter();
  const [_, setWinery] = useRecoilState(wineryState);
  const {id, storyId} = router.query;

  if (!item) {
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
          activeWinery: item,
        });
        router.push({
          pathname: `/wines/${id}/stories/${storyId}/chapters/${item.chapterId}`,
        });
      }}
    >
      <ShortHandMenu chapterId={item.chapterId} />
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
      />
      <div className="w-full">
        <h2 className={cx('text-xl line-clamp-2')}>{`Chapter ${
          chapterIndex + 1
        }`}</h2>
        <p className={cx('text-xl line-clamp-2')}>{item.chapterTitle}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
