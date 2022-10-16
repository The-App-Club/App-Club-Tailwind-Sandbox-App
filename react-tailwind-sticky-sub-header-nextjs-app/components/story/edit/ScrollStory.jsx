import {css, cx} from '@emotion/css';
import {createRef, useMemo, useRef, useState} from 'react';
import {Scrollama, Step} from 'react-scrollama';
import {useRecoilState} from 'recoil';
import {MathUtils} from 'three';

import ScrollStoryCaption from '@/components/story/create/ScrollStoryCaption';
import ScrollStoryModel from '@/components/story/create/ScrollStoryModel';
import ScrollStorySection from '@/components/story/create/ScrollStorySection';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';

const ScrollStory = () => {
  const [scrollTrigger, setScrollTrigger] = useRecoilState(scrollTriggerState);
  const [chapterId, setChapterId] = useState(1);
  const mapContainer = useRef(null);
  const prevProgress = useRef(0);

  const data = useMemo(() => {
    return [
      {
        chapterId: 1,
        model: () => {
          return (
            <ScrollStoryModel
              chapterId={1}
              title={`Food-and-Drinks-12`}
              modelURL={`/assets/Food-and-Drinks-12.png`}
            />
          );
        },
        caption: () => {
          return <ScrollStoryCaption a={'This is Cake'} chapterId={1} />;
        },
      },
      {
        chapterId: 2,
        model: () => {
          return (
            <ScrollStoryModel
              chapterId={2}
              title={`Food-and-Drinks-19`}
              modelURL={`/assets/Food-and-Drinks-19.png`}
            />
          );
        },
        caption: () => {
          return <ScrollStoryCaption a={'Cool Beer'} chapterId={2} />;
        },
      },
      {
        chapterId: 3,
        model: () => {
          return (
            <ScrollStoryModel
              chapterId={3}
              title={`Food-and-Drinks-20`}
              modelURL={`/assets/Food-and-Drinks-20.png`}
            />
          );
        },
        caption: () => {
          return <ScrollStoryCaption a={'Nice Coffee'} chapterId={3} />;
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
        <div className={`absolute top-3 right-3 border-2 p-2 w-[130px]`}>
          <div className="font-bold flex items-center gap-1 text-black dark:text-slate-300">
            chapterId<span>{scrollTrigger.chapterId}</span>
          </div>
          <div className="font-bold flex items-center gap-1 text-black dark:text-slate-300">
            progress<span>{scrollTrigger.progress?.toFixed(2)}</span>
          </div>
        </div>
        {matchedData.model()}
        {matchedData.caption()}
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
