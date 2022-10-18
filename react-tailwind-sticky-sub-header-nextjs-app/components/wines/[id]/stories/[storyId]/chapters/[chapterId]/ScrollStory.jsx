import {css, cx} from '@emotion/css';
import {createRef, useEffect, useMemo, useRef, useState} from 'react';
import {Scrollama, Step} from 'react-scrollama';
import {useRecoilState} from 'recoil';
import {MathUtils} from 'three';

import ScrollStoryCaption from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStoryCaption';
import ScrollStoryModel from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStoryModel';
import ScrollStorySection from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStorySection';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {useRouter} from 'next/router';

const ScrollStory = () => {
  const router = useRouter();
  const {id, storyId, chapterId} = router.query;
  const [scrollTrigger, setScrollTrigger] = useRecoilState(scrollTriggerState);
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

  useEffect(() => {
    setScrollTrigger({
      progress: 0,
      chapterId,
      direction: 'down',
    });
  }, [chapterId, setScrollTrigger]);

  const handleStepEnter = (e) => {
    let {data, progress, direction} = e;
    progress = MathUtils.clamp(progress, 0, 1);
    setScrollTrigger({
      chapterId,
      progress: clampProgress({direction, progress}),
      direction,
    });
    prevProgress.current = progress;
  };

  const handleStepExit = (e) => {};

  const handleStepProgress = (e) => {};

  return (
    <div key={chapterId} className="relative">
      <div
        ref={mapContainer}
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
          `border-2`,
          `bg-white dark:bg-slate-700`,
          `flex items-center justify-center flex-col`
        )}
      >
        <div className={`absolute top-3 right-3 border-2 p-2 w-[120px]`}>
          <div className="text-sm font-bold flex items-center gap-1 text-black dark:text-slate-300">
            id<span>{scrollTrigger.chapterId}</span>
          </div>
          <div className="text-sm font-bold flex items-center gap-1 text-black dark:text-slate-300">
            progress<span>{scrollTrigger.progress?.toFixed(2)}</span>
          </div>
        </div>
        <ScrollStoryModel />
        <ScrollStoryCaption />
      </div>
      <div
        className={css`
          width: 50%;
          margin-left: 50%;
        `}
      >
        <Scrollama
          // offset={0.8}
          offset={1.0}
          onStepEnter={handleStepEnter}
          onStepExit={handleStepExit}
          onStepProgress={handleStepEnter}
          debug={false}
        >
          <Step data={1}>
            <ScrollStorySection ref={createRef()} />
          </Step>
        </Scrollama>
      </div>
    </div>
  );
};

export default ScrollStory;
