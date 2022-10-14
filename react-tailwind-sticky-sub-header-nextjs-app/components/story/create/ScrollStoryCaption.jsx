import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {
  AnimatePresence,
  motion,
  motionValue,
  useTransform,
} from 'framer-motion';
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
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

const ScrollStoryCaption = ({a, chapterId}) => {
  const {
    direction,
    progress,
    chapterId: activeChapterId,
  } = useRecoilValue(scrollTriggerState);
  const opacity = useTransform(motionValue(progress), [0, 0.5, 1], [0, 1, 0]);
  const x = useTransform(motionValue(progress), [0, 0.5, 1], [70, 0, 70]);
  if (isNaN(opacity.get())) {
    return;
  }
  if (isNaN(x.get())) {
    return;
  }
  return (
    <motion.p
      style={{
        opacity,
        x,
      }}
    >
      {a}
    </motion.p>
  );
};

export default ScrollStoryCaption;
