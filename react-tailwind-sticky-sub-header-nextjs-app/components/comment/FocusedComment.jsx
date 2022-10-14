import {css, cx} from '@emotion/css';
import {FaRegComments} from 'react-icons/fa';
import Comment from '@/components/comment/Comment';

const FocusedComment = ({item}) => {
  if (!item) {
    return;
  }
  return (
    <div className={cx(`w-full rounded-xl`, `bg-white dark:bg-slate-700`)}>
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <FaRegComments size={24} />
        Focused Comment
      </h2>
      <div className="w-full p-2">
        <Comment item={item} className={`mb-0`} />
      </div>
    </div>
  );
};

export default FocusedComment;
