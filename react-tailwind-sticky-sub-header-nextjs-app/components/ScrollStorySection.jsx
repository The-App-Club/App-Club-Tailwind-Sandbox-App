import {css, cx} from '@emotion/css';
import {gsap} from 'gsap';
import {useEffect, useLayoutEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {mergeRefs} from 'react-merge-refs';

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
          min-height: 100vh;
          margin-bottom: 100vh;
        `
      )}
    >
      {children}
    </section>
  );
};

export default ScrollStorySection;
