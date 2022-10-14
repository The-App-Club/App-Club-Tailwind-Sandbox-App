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

const ScrollStoryModel = ({chapterId}) => {
  const {
    direction,
    progress,
    chapterId: activeChapterId,
  } = useRecoilValue(scrollTriggerState);

  const opacity = useTransform(motionValue(progress), [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(motionValue(progress), [0, 0.5, 1], [30, 0, 30]);
  if (isNaN(opacity.get())) {
    return;
  }
  if (isNaN(y.get())) {
    return;
  }
  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
    >
      <picture>
        <source srcSet={`/assets/logo.png`} type={`image/png`} />
        <img src={'/assets/logo.png'} alt={'logo'} width={320} height={320} />
      </picture>
    </motion.div>
  );
};

export default ScrollStoryModel;
