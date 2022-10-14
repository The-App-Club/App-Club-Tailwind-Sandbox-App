import {css, cx} from '@emotion/css';
import {createRef, useCallback, useEffect, useRef, useState} from 'react';
import ScrollStorySection from '@/components/story/create/ScrollStorySection';
import {Scrollama, Step} from 'react-scrollama';
import {MathUtils} from 'three';
import Spacer from '@/components/Spacer';
import {motion, useAnimationControls} from 'framer-motion';
import {useRecoilValue} from 'recoil';
import {scrollDirectionState} from '@/stores/scrollDirectionStore';

const ScrollStory = () => {
  const mapContainerControls = useAnimationControls();
  const {scrollDirection} = useRecoilValue(scrollDirectionState);
  const mapContainer = useRef(null);
  const prevProgress = useRef(0);

  const clampProgress = ({direction, progress}) => {
    if (direction === 'up') {
      if (isNaN(prevProgress.current)) {
        return 1;
      } else {
        return isNaN(progress) ? 1 : progress;
      }
    } else if (direction === 'down') {
      if (isNaN(prevProgress.current)) {
        return 0;
      } else {
        return isNaN(progress) ? 0 : progress;
      }
    }
  };

  const handleStepEnter = (e) => {
    let {data, progress, direction} = e;
    progress = MathUtils.clamp(progress, 0, 1);

    // console.log(
    //   `[section${data}]`,
    //   clampProgress({direction, progress}),
    //   direction
    // );

    prevProgress.current = progress;
  };

  const handleStepExit = (e) => {};

  const handleStepProgress = (e) => {};

  useEffect(() => {
    if (!scrollDirection) {
      return;
    }
    if (scrollDirection === `UP`) {
      if (window.matchMedia('(max-width: 768px)').matches) {
        mapContainerControls.start({
          top: `15rem`,
        });
      } else {
        mapContainerControls.start({
          top: `9rem`,
        });
      }

      return;
    }
    if (scrollDirection === `DOWN`) {
      mapContainerControls.start({
        top: `6rem`,
      });

      return;
    }
  }, [scrollDirection, mapContainerControls]);

  return (
    <div className="relative">
      <motion.div
        ref={mapContainer}
        animate={mapContainerControls}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
        className={cx(
          css`
            position: sticky;
            top: calc(
              3rem * 3
            ); // (header height) + navbar height + page header height
            left: 0;
            width: 50%;
            height: calc(100vh - calc(3rem * 3));
            @media (max-width: 768px) {
              top: calc(
                3rem * 2
              ); // (header height) + navbar height + page header height
              height: calc(100vh - calc(3rem * 2));
            }
          `,
          `bg-slate-200`
        )}
      />
      <div
        className={css`
          width: 50%;
          margin-left: 50%;
        `}
      >
        <Scrollama
          offset={0.8}
          onStepEnter={handleStepEnter}
          onStepExit={handleStepExit}
          onStepProgress={handleStepEnter}
          debug={false}
        >
          <Step data={1}>
            <ScrollStorySection chapterId={`1`} ref={createRef()} />
          </Step>
          <Step data={2}>
            <ScrollStorySection chapterId={`2`} ref={createRef()} />
          </Step>
          <Step data={3}>
            <ScrollStorySection chapterId={`3`} ref={createRef()} />
          </Step>
        </Scrollama>
      </div>
    </div>
  );
};

export default ScrollStory;
