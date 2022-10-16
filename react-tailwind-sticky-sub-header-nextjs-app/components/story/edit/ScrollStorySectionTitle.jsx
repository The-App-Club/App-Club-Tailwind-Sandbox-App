import {css, cx} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import { useState} from 'react';
import {BiPencil} from 'react-icons/bi';

import ScrollStoryTitleForm from '@/components/story/create/ScrollStoryTitleForm';

const ScrollStorySectionTitle = ({chapterId}) => {
  const [isShow, setIsShow] = useState(false);

  const handleEdit = (e) => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  return (
    <div
      className={cx(
        css`
          z-index: 1;
          position: sticky;
          top: calc(
            3rem * 3
          ); // (header height) + navbar height + page header height
          @media (max-width: 768px) {
            top: calc(
              3rem * 2
            ); // (header height) + navbar height + page header height
          }
        `,
        `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
      )}
    >
      <h3>221b Baker St.</h3>
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
          <ScrollStoryTitleForm chapterId={chapterId} setIsShow={setIsShow} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollStorySectionTitle;
