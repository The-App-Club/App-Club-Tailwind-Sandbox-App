import {cx, css} from '@emotion/css';
import {useEffect, useLayoutEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import gsap from 'gsap';
import {mergeRefs} from 'react-merge-refs';
import {useRecoilState} from 'recoil';

const ScrollStorySection = ({children, chapterName, doMarked}) => {
  const itemRef = useRef(null);
  const {ref, inView, entry} = useInView({});

  useLayoutEffect(() => {
    gsap.set(itemRef.current, {opacity: 0});
  }, []);

  useEffect(() => {
    if (!entry) {
      return;
    }
    doMarked({activeChapterName: chapterName, inView});
    // console.log(`inView, chapterName`, inView, chapterName);
    if (inView) {
      gsap.to(entry.target, {opacity: 1, duration: 0.75});
    } else {
      gsap.to(entry.target, {opacity: 0, duration: 0.75});
    }
  }, [inView, entry, chapterName, doMarked]);

  return (
    <section
      ref={mergeRefs([itemRef, ref])}
      className={cx(
        css`
          padding: 0.5rem;
          min-height: 100vh;
          margin-bottom: 100vh;
          &:first-child {
            /* margin-top: 100vh; */
          }
          &:last-child {
            /* margin-bottom: 100vh; */
          }
        `
      )}
    >
      {children}
    </section>
  );
};

export default ScrollStorySection;
