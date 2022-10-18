import {
  AnimatePresence,
  motion,
  motionValue,
  useTransform,
} from 'framer-motion';
import {useRecoilValue} from 'recoil';

import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {useState} from 'react';
import {BiPencil} from 'react-icons/bi';
import ScrollStorySentenceForm from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStorySentenceForm';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hidden: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const ScrollStoryCaption = () => {
  const [isShow, setIsShow] = useState(false);

  const handleEdit = (e) => {
    setIsShow((prev) => {
      return !prev;
    });
  };
  const {progress} = useRecoilValue(scrollTriggerState);

  const opacity = useTransform(motionValue(progress), [0, 0.5, 1], [0, 1, 0]);
  const x = useTransform(motionValue(progress), [0, 0.5, 1], [-70, 0, -70]);
  const y = useTransform(motionValue(progress), [0, 0.5, 1], [70, 0, 70]);

  if (isNaN(opacity.get())) {
    return;
  }
  if (isNaN(x.get())) {
    return;
  }
  if (isNaN(y.get())) {
    return;
  }
  return (
    <motion.div
      className="text-lg font-bold"
      style={{
        opacity,
        x,
        y,
      }}
    >
      <p>This is model image marked description</p>
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
        {isShow && <ScrollStorySentenceForm setIsShow={setIsShow} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScrollStoryCaption;
