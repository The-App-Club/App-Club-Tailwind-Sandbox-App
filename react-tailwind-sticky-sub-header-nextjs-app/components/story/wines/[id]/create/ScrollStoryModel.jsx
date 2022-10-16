import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {css} from '@emotion/css';
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

const ScrollStoryModel = ({chapterId, modelURL, title}) => {
  const {
    direction,
    progress,
    chapterId: activeChapterId,
  } = useRecoilValue(scrollTriggerState);

  // TODO ベジェとかでもうちょいカスタマイズしたい

  const opacity = useTransform(motionValue(progress), [0, 0.5, 1], [0, 1, 0]);
  const x = useTransform(motionValue(progress), [0, 0.5, 1], [30, 0, 30]);
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
        x,
        y,
      }}
    >
      <picture>
        <source srcSet={modelURL || `/assets/logo.png`} type={`image/png`} />
        <img
          src={modelURL || `/assets/logo.png`}
          alt={title}
          width={320}
          height={320}
        />
      </picture>
    </motion.div>
  );
};

export default ScrollStoryModel;
