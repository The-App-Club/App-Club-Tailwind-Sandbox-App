import {css, cx} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import {useMemo, useState} from 'react';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineQuickreply,
  MdUpdate,
} from 'react-icons/md';
import CommentForm from './CommentForm';
import Spacer from './Spacer';
import Layout from '../layouts/default';
import {TiPencil} from 'react-icons/ti';
import {useRouter} from 'next/router';
import Link from 'next/link';
import data from '../data/comment.json';

const Comment = ({item}) => {
  const router = useRouter();

  const replyCount = useMemo(() => {
    if (!item) {
      return 0;
    }
    return data.filter((d) => {
      return d.parentCommentId === item.commentId;
    }).length;
  }, [item]);

  const [isShow, setIsShow] = useState(false);

  const handleReply = (e) => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  return (
    <div
      id={item.commentId}
      className={cx(
        'relative w-full min-h-[8rem] border-2 rounded-xl px-2 py-2',
        `border-2 border-gray-200 dark:border-slate-500`,
        `mb-2`
      )}
    >
      <div className="w-full flex items-start gap-2 min-h-[3rem]">
        <div className={cx('w-full flex flex-col items-start gap-2')}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <picture className={css``}>
                <source srcSet={item.avatorURL} type={`image/png`} />
                <img
                  src={item.avatorURL}
                  alt={'profile'}
                  width={40}
                  height={40}
                  className={`rounded-full border-2`}
                />
              </picture>
              <span>{item.userName}</span>
            </div>
            <span className="flex items-center justify-center">{`#${item.commentId}`}</span>
          </div>
          <div className={cx('w-full flex items-center gap-1 px-1')}>
            <time className="flex items-center">
              <TiPencil size={16} />
              <span className="text-sm">{item.createdAt}</span>
            </time>
            <time className="flex items-center">
              <MdUpdate size={16} />
              <span className="text-sm">{item.updatedAt}</span>
            </time>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <p className="break-words">{item.text}</p>
      </div>
      <div
        className={cx(
          'w-full h-[32px] flex justify-between px-2 min-h-[3rem] items-center',
          `border-t-2 border-gray-200 dark:border-slate-500`
        )}
      >
        {item.parentCommentId && (
          <Link
            replace
            passHref
            scroll={false}
            shallow
            href={{
              pathname: router.pathname,
              query: router.query,
              hash: item.parentCommentId,
            }}
            // https://nextjs.org/docs/api-reference/next/link
          >
            <span className="w-full flex items-start justify-start hover:underline hover:cursor-pointer">{`linked to #${item.parentCommentId}`}</span>
          </Link>
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
        {isShow && (
          <CommentForm commentId={item.commentId} setIsShow={setIsShow} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comment;
