import {css, cx} from '@emotion/css';
import {Step} from 'react-scrollama';
import Spacer from '@/components/Spacer';
import {forwardRef, useEffect, useMemo} from 'react';
import {scrollTriggerState} from '@/stores/scrollTriggerStore';
import {useRecoilValue} from 'recoil';

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
          padding: 0.5rem;
          min-height: 100vh;
          margin-bottom: 100vh;
        `
      )}
    >
      <h3
        className={cx(
          css`
            position: sticky;
            top: calc(
              3rem * 3
            ); // (header height) + navbar height + page header height
            @media (max-width: 768px) {
              top: calc(
                3rem * 2
              ); // (header height) + navbar height + page header height
            }
          `,
          `bg-white text-xl dark:bg-slate-700`
        )}
      >
        221b Baker St.
      </h3>
      <Spacer height="90vh" />
      <p>
        November 1895. London is shrouded in fog and Sherlock Holmes and Watson
        pass time restlessly awaiting a new case. &quot;The London criminal is
        certainly a dull fellow,&quot; Sherlock bemoans. &quot;There have been
        numerous petty thefts,&quot; Watson offers in response. Just then a
        telegram arrives from Sherlock&apos;s brother Mycroft with a mysterious
        case.
      </p>
    </section>
  );
};

const ScrollStorySection = forwardRef(_ScrollStorySection);

export default ScrollStorySection;
