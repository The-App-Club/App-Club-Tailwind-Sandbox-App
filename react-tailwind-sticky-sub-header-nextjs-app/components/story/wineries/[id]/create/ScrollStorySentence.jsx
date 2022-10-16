import {cx} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';
import {gsap} from 'gsap';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {BiPencil} from 'react-icons/bi';
import {useInView} from 'react-intersection-observer';
import {mergeRefs} from 'react-merge-refs';

import ScrollStorySentenceForm from '@/components/story/create/ScrollStorySentenceForm';

const ScrollStorySentence = ({chapterId}) => {
  const itemRef = useRef(null);
  const {ref, inView, entry} = useInView({});
  const [isShow, setIsShow] = useState(false);

  useLayoutEffect(() => {
    gsap.set(itemRef.current, {y: 60, opacity: 0});
  }, []);

  useEffect(() => {
    if (!entry) {
      return;
    }
    if (inView) {
      gsap.to(entry.target, {y: 0, opacity: 1, duration: 0.75});
    } else {
      gsap.to(entry.target, {y: 60, opacity: 0, duration: 0.75});
    }
  }, [inView, entry]);

  const handleEdit = (e) => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  return (
    <div className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
      <p ref={mergeRefs([itemRef, ref])}>
        November 1895. London is shrouded in fog and Sherlock Holmes and Watson
        pass time restlessly awaiting a new case. &quot;The London criminal is
        certainly a dull fellow,&quot; Sherlock bemoans. &quot;There have been
        numerous petty thefts,&quot; Watson offers in response. Just then a
        telegram arrives from Sherlock&apos;s brother Mycroft with a mysterious
        case.
      </p>
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
          <ScrollStorySentenceForm
            chapterId={chapterId}
            setIsShow={setIsShow}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollStorySentence;
