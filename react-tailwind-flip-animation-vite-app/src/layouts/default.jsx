import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import Scrollbars from 'rc-scrollbars';
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
  hide: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const Layout = ({children, pageName, notifier}) => {
  return (
    <motion.div
      variants={motionConfig}
      initial={'initial'}
      animate={'animate'}
      exit={'hide'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className={cx(
        css`
          position: relative;
          width: 100%;
        `,
        `px-2`
      )}
      onAnimationStart={(e) => {}}
      onAnimationComplete={(e) => {
        notifier();
      }}
    >
      <Scrollbars
        className={cx(
          css`
            width: 100%;
            min-height: calc(100vh - 6rem);
          `,
          `border-2`
        )}
      >
        {children}
      </Scrollbars>
    </motion.div>
  );
};

export default memo(Layout);
