import {css, cx} from '@emotion/css';
import {motion, AnimatePresence, useAnimationControls} from 'framer-motion';
import {useEffect, useMemo} from 'react';
import {useStoreSidebarMenuPosition} from '../hooks/useStoreSidebarMenuPosition';

const SidebarTooltip = ({opened, sidebarMinWidth, sidebarMaxWidth}) => {
  const controls = useAnimationControls();
  const {sidebarMenuPosition} = useStoreSidebarMenuPosition((state) => {
    return {
      sidebarMenuPosition: state.sidebarMenuPosition,
    };
  });

  const sidebarWidth = useMemo(() => {
    if (opened) {
      return sidebarMaxWidth;
    } else {
      return sidebarMinWidth;
    }
  }, [opened, sidebarMinWidth, sidebarMaxWidth]);

  useEffect(() => {
    controls.set({
      top: sidebarMenuPosition.y + 48, // 48 is 3rem
    });
    if (sidebarMenuPosition.hovering) {
      controls.start({
        x: sidebarWidth + 0,
        opacity: 1,
      });
    } else {
      controls.start({
        x: sidebarWidth + 60,
        opacity: 0,
      });
    }
  }, [sidebarMenuPosition]);

  return (
    <motion.div
      className={cx(
        css`
          position: fixed;
          min-width: 8rem;
          min-height: 6rem;
          pointer-events: none;
          z-index: 2;
        `,
        'border-2 bg-white rounded-lg p-2'
      )}
      initial={{
        opacity: 0,
      }}
      animate={controls}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >
      <h2 className="text-lg">{sidebarMenuPosition.text}</h2>
      <p>something descripotion...</p>
      <p>something descripotion...</p>
      <p>something descripotion...</p>
    </motion.div>
  );
};

export {SidebarTooltip};
