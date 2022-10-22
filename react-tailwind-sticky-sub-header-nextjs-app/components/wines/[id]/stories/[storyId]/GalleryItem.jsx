import {css, cx} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {BiPencil} from 'react-icons/bi';
import {useRecoilState} from 'recoil';

import ChapterTitleForm from '@/components/wines/[id]/stories/[storyId]/ChapterTitleForm';
import ShortHandMenu from '@/components/wines/[id]/stories/[storyId]/ShortHandMenu';
import wineryState from '@/stores/wineryStore';

const GalleryItem = ({item, chapterIndex}) => {
  const router = useRouter();
  const [_, setWinery] = useRecoilState(wineryState);
  const {id, storyId} = router.query;

  const [isShow, setIsShow] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsShow((prev) => {
      return !prev;
    });
  };

  if (!item) {
    return;
  }

  return (
    <div
      className={cx(
        `relative`,
        `w-full border-2 p-2`,
        `hover:cursor-pointer`,
        `hover:bg-gray-100 dark:hover:bg-slate-800 shadow-lg hover:shadow-2xl`
      )}
      onClick={(e) => {
        if (isShow) {
          return;
        }
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
        <h3 className={cx('text-lg line-clamp-2')}>{item.chapterTitle}</h3>
        <div
          className="flex justify-end items-center gap-1 hover:cursor-pointer"
          onClick={handleEdit}
        >
          <BiPencil size={20} fill={`rgb(156 163 175)`} />
          <span className="text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-50">
            {isShow ? `Cancel` : `Edit`}
          </span>
        </div>
        <AnimatePresence>
          {isShow && (
            <ChapterTitleForm
              chapterId={item.chapterId}
              setIsShow={setIsShow}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryItem;
