import {
  motion,
  motionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import {useRecoilValue} from 'recoil';

import ModelUploader from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ModelUploader';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {doEaseOutQuart} from '@/config/easing';

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

const ScrollStoryModel = () => {
  const {progress} = useRecoilValue(scrollTriggerState);
  const opacity = useTransform(
    motionValue(progress),
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0],
    {
      ease: doEaseOutQuart,
    }
  );
  const x = useTransform(
    motionValue(progress),
    [0, 0.3, 0.9, 1],
    [30, 0, 0, 30],
    {
      ease: doEaseOutQuart,
    }
  );
  const y = useTransform(
    motionValue(progress),
    [0, 0.3, 0.9, 1],
    [30, 0, 0, 30],
    {
      ease: doEaseOutQuart,
    }
  );
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
        x,
        y,
      }}
    >
      <p className="text-sm">画像サイズは 320w x 320h 以上の正方形</p>
      <ModelUploader />
    </motion.div>
  );
};

export default ScrollStoryModel;
