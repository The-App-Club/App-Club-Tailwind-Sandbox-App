import {css, cx} from '@emotion/css';
import {forwardRef, useEffect} from 'react';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import ScrollStorySectionTitle from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStorySectionTitle';
import ScrollStorySentence from '@/components/wineries/[id]/stories/[storyId]/chapters/[chapterId]/ScrollStorySentence';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {useRouter} from 'next/router';

const _ScrollStorySection = ({}, ref) => {
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
      <ScrollStorySentence />
      <Spacer height="10vh" />
      <ScrollStorySentence />
    </section>
  );
};

const ScrollStorySection = forwardRef(_ScrollStorySection);

export default ScrollStorySection;
