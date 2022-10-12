import {css, cx} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import {useMemo, useState} from 'react';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineQuickreply,
} from 'react-icons/md';
import CommentForm from './CommentForm';
import Spacer from './Spacer';
import Layout from '../layouts/default';

const Comment = ({parentCommentId = null, commentId, replyCount = 0}) => {
  // const replyCount = useMemo(() => {
  //   return 3;
  // }, [parentCommentId]);

  const [isShow, setIsShow] = useState(false);

  const handleReply = (e) => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  return (
    <div
      className={cx(
        'relative w-full min-h-[8rem] border-2 rounded-xl px-2 py-2',
        `border-2 border-gray-200 dark:border-slate-500`
      )}
    >
      <div className="w-full flex items-center gap-2 min-h-[3rem]">
        <div className="w-full flex items-center gap-2">
          <picture className={css``}>
            <source srcSet={`/assets/profile.png`} type={`image/png`} />
            <img
              src={'/assets/profile.png'}
              alt={'profile'}
              width={40}
              height={40}
              className={`rounded-full border-2`}
            />
          </picture>
          <span>nap5</span>
          <span>{`2022/10/10 11:25:23`}</span>
        </div>
        <span className="flex items-center justify-center">{`#${commentId}`}</span>
      </div>
      <div className="w-full p-2">
        <p className="break-words">
          NiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNice
        </p>
        <p className="break-words">Hey🤞</p>
      </div>
      <div
        className={cx(
          'w-full h-[32px] flex justify-between px-2 min-h-[3rem] items-center',
          `border-t-2 border-gray-200 dark:border-slate-500`
        )}
      >
        {parentCommentId && (
          <span className="w-full flex items-start justify-start hover:underline hover:cursor-pointer">{`linked to #${parentCommentId}`}</span>
        )}
        {replyCount !== 0 && (
          <span className="w-full flex items-start justify-start">{`have ${replyCount} reply`}</span>
        )}
        <div className="w-full flex justify-end items-center gap-4">
          <div className="flex items-center gap-1 hover:cursor-pointer">
            {false ? (
              <MdOutlineFavorite
                size={24}
                fill={`rgb(244 114 182)`} // bg-pink-400
              />
            ) : (
              <MdFavoriteBorder
                size={24}
                fill={`rgb(156 163 175)`} // text-gray-400
              />
            )}
            <span className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-50">
              Like
            </span>
          </div>
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={handleReply}
          >
            <MdOutlineQuickreply size={24} fill={`rgb(156 163 175)`} />
            <span className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-50">
              {isShow ? `Cancel` : `Reply`}
            </span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isShow && <CommentForm commentId={commentId} setIsShow={setIsShow} />}
      </AnimatePresence>
    </div>
  );
};

export default Comment;
