import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {MdOutlineTimeline} from 'react-icons/md';
// https://dev.to/readymadecode/timeline-component-in-react-81c

import Spacer from '@/components/Spacer';
import Comment from '@/components/comment/Comment';
import dataComments from '@/data/comments.json';

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
          `rounded-t-xl`,
          `text-lg flex items-center justify-start flex-col gap-1 p-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          `bg-white dark:bg-slate-700 shadow-md`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <MdOutlineTimeline size={24} />
        Timeline
        <Breadcrumbs
          useDefaultStyle={true}
          replaceCharacterList={[{from: '.', to: ' '}]}
          containerClassName="text-sm bg-white dark:bg-slate-700"
          activeItemClassName={'text-gray-500 dark:text-slate-500'}
          inactiveItemClassName={'text-gray-800 font-bold dark:text-slate-300'}
          transformLabel={(title) => {
            const niceTitle = capitalize(title);
            if (niceTitle === `Comment`) {
              return `${niceTitle}`;
            }
            return `${niceTitle} > `;
          }}
        />
      </h2>
      <div className={`w-full p-2`}>
        {dataComments.map((item, index) => {
          return <Comment item={item} key={index} />;
        })}
      </div>
      <Spacer height="50vh" />
    </div>
  );
};

export default CommentTimeline;
