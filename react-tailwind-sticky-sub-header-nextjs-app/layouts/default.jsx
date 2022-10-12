import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo} from 'react';

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

const Layout = ({children, className}) => {
  return (
    <motion.div
      className={cx(
        css`
          width: 100%;
          position: relative;
        `,
        className
      )}
      initial={'initial'}
      animate={'animate'}
      exit={'hidden'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      variants={motionConfig}
      onAnimationStart={(e) => {}}
      onAnimationComplete={(e) => {}}
    >
      {children}
    </motion.div>
  );
};

export default memo(Layout);
