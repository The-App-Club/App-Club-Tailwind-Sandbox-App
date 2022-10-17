import {motion, motionValue, useTransform} from 'framer-motion';
import {useRecoilValue} from 'recoil';

import {scrollTriggerState} from '@/stores/scrollTriggerStore';

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
  const x = useTransform(motionValue(progress), [0, 0.5, 1], [-70, 0, -70]);
  if (isNaN(opacity.get())) {
    return;
  }
  if (isNaN(x.get())) {
    return;
  }
  return (
    <motion.p
      className="text-lg font-bold"
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
