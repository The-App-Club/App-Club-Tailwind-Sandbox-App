import {css, cx} from '@emotion/css';
import {MdOutlineQuickreply, MdOutlineTimeline} from 'react-icons/md';
// https://dev.to/readymadecode/timeline-component-in-react-81c
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineLocationOn,
} from 'react-icons/md';
import Comment from './Comment';
import Spacer from './Spacer';

const CommentTimeline = () => {
  return (
    <div
      className={cx(
        'w-full max-w-2xl',
        `border-2 border-gray-200 dark:border-slate-500`,
        `bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
        css`
          min-height: calc(100vh + 34rem); // mock attach
        `
      )}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <MdOutlineTimeline size={24} />
        Timeline
      </h2>
      <div className={`w-full p-2`}>
        <Comment commentId={`1`} replyCount={1} />
        <Spacer />
        <Comment parentCommentId={`1`} commentId={`2`} />
        <Spacer />
        <Comment commentId={`3`} replyCount={1} />
        <Spacer />
        <Comment commentId={`4`} />
        <Spacer />
        <Comment parentCommentId={`3`} commentId={`5`} />
      </div>
    </div>
  );
};

export default CommentTimeline;
