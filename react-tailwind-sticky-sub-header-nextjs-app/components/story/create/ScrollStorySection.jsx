import {css, cx} from '@emotion/css';
import {forwardRef, useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import ScrollStorySectionTitle from '@/components/story/create/ScrollStorySectionTitle';
import ScrollStorySentence from '@/components/story/create/ScrollStorySentence';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';

const _ScrollStorySection = ({chapterId}, ref) => {
  // title,sentence textarea form by chapterId
  const {
    direction,
    progress,
    chapterId: activeChapterId,
  } = useRecoilValue(scrollTriggerState);

  useEffect(() => {
    if (activeChapterId === Number(chapterId)) {
      // console.log(
      //   `direction, progress, activeChapterId, chapterId`,
      //   direction,
      //   progress,
      //   activeChapterId,
      //   Number(chapterId)
      // );
    }
  }, [direction, progress, activeChapterId, chapterId]);

  return (
    <section
      ref={ref}
      className={cx(
        css`
          min-height: 100vh;
          /* margin-bottom: 100vh; */
          padding-bottom: 100vh;
        `
      )}
    >
      <ScrollStorySectionTitle />
      <Spacer height="90vh" />
      <ScrollStorySentence chapterId={chapterId} />
      <Spacer height="10vh" />
      <ScrollStorySentence chapterId={chapterId} />
    </section>
  );
};

const ScrollStorySection = forwardRef(_ScrollStorySection);

export default ScrollStorySection;
