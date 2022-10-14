import {css, cx} from '@emotion/css';
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ScrollStorySection from '@/components/story/create/ScrollStorySection';
import {Scrollama, Step} from 'react-scrollama';
import {MathUtils} from 'three';
import Spacer from '@/components/Spacer';
import {AnimatePresence, motion, useAnimationControls} from 'framer-motion';
import {useRecoilState, useRecoilValue} from 'recoil';
import {scrollDirectionState} from '@/stores/scrollDirectionStore';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {usePrevious} from '@/hooks/usePrevious';
import ScrollStoryCaption from '@/components/story/create/ScrollStoryCaption';
import ScrollStoryModel from '@/components/story/create/ScrollStoryModel';

const ScrollStory = () => {
  const mapContainerControls = useAnimationControls();
  const {scrollDirection} = useRecoilValue(scrollDirectionState);
  const [scrollTrigger, setScrollTrigger] = useRecoilState(scrollTriggerState);
  const [chapterId, setChapterId] = useState(1);
  const mapContainer = useRef(null);
  const prevProgress = useRef(0);

  const data = useMemo(() => {
    return [
      {
        chapterId: 1,
        model: () => {
          return <ScrollStoryModel chapterId={1} />;
        },
        caption: () => {
          return <ScrollStoryCaption a={'aaaa'} chapterId={1} />;
        },
      },
      {
        chapterId: 2,
        model: () => {
          return <ScrollStoryModel chapterId={2} />;
        },
        caption: () => {
          return <ScrollStoryCaption a={'bbbb'} chapterId={2} />;
        },
      },
      {
        chapterId: 3,
        model: () => {
          return <ScrollStoryModel chapterId={3} />;
        },
        caption: () => {
          return <ScrollStoryCaption a={'cccc'} chapterId={3} />;
        },
      },
    ];
  }, []);

  const matchedData = useMemo(() => {
    return data.find((item) => {
      return item.chapterId === chapterId;
    });
  }, [chapterId, data]);

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
    setChapterId(data);
    setScrollTrigger({
      chapterId: data,
      progress: clampProgress({direction, progress}),
      direction,
    });
    prevProgress.current = progress;
  };

  const handleStepExit = (e) => {};

  const handleStepProgress = (e) => {};

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
          `bg-slate-200 flex items-center justify-center flex-col`
        )}
      >
        {matchedData.model()}
        {matchedData.caption()}
      </motion.div>
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
