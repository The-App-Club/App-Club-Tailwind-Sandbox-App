import {useEffect, useRef} from 'react';
import {useClickOutside} from '../hooks/useClickOutside';
import styled from '@emotion/styled';
import gsap, {Power3} from 'gsap';
import {css, cx} from '@emotion/css';
import {useSynchroToc} from '../hooks/useSynchroToc';
// import tocbot from 'tocbot';

const Nav = styled.nav`
  position: fixed;
  right: 0;
  z-index: 2;
  transform: translate(100%, 0%);
  background-color: #fafbfc;
  min-height: 100vh;
  max-width: 30rem;
  @media (max-width: 768px) {
    max-width: 16rem;
  }
  height: 100%;
  overflow: auto;
  width: 100%;
`;

const TocSp = ({opened, setOpened, isTrigger, setIsTrigger}) => {
  const navContainerDomRef = useRef();

  const {activeHref, setAcitveHref} = useSynchroToc((state) => {
    return {
      activeHref: state.activeHref,
      setAcitveHref: state.setAcitveHref,
    };
  });

  const resetActiveLinkHref = () => {
    return [...document.querySelectorAll('nav.sp a')].forEach((dom) => {
      dom.classList.remove('is-active-link');
    });
  };

  const attachActiveLink = ({activeHref}) => {
    const dom = document.querySelector(`a[href="${activeHref}"]`);
    dom.classList.add('is-active-link');
  };

  useEffect(() => {
    if (!activeHref) {
      return;
    }
    resetActiveLinkHref();
    attachActiveLink({activeHref});
  }, [activeHref]);

  useEffect(() => {
    tocbot.init({
      isCollapsedClass: `sp-is-not-collapsed`,
      // Where to render the table of contents.
      tocSelector: 'nav.sp',
      // Where to grab the headings to build the table of contents.
      contentSelector: 'main',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'section.blog > h1, h2, h3',
      onClick: function (e) {
        const href = e.currentTarget.getAttribute('href');
        setAcitveHref({href});
        if (!isTrigger) {
          setOpened(false);
        }
      },
      scrollSmoothOffset: -40,
    });

    return () => {
      tocbot.destroy();
    };
  }, []);

  useClickOutside(navContainerDomRef, (e) => {
    if (!isTrigger) {
      setOpened(false);
    }
  });

  useEffect(() => {
    if (opened) {
      document.body.classList.add('loading');
      gsap.to(navContainerDomRef.current, {
        x: `0%`,
        duration: 0.6,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    } else {
      document.body.classList.remove('loading');
      gsap.to(navContainerDomRef.current, {
        x: `100%`,
        duration: 0.6,
        ease: Power3.easeInOut,
        onComplete: function () {
          setIsTrigger(false);
        },
      });
    }
  }, [opened]);

  return (
    <Nav
      ref={navContainerDomRef}
      className={cx(
        `sp`,
        css`
          & {
            width: 100%;
            background-color: #fafbfc;
            border: 1px solid rgba(27, 31, 35, 0.15);
            border-radius: 0.25rem;
            padding: 1rem;
            font-size: 0.875rem;
          }

          a {
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          }

          .toc-list .toc-list {
            padding-left: 1.25rem;
            padding-top: 0.5rem;
          }

          .toc-list-item {
            padding-bottom: 0.5rem;
          }

          .toc-list-item:last-child {
            padding-bottom: 0;
          }

          .toc-link {
            height: 1.25rem;
            &:not(.is-active-link)::before {
              background-color: transparent;
            }
          }

          .is-active-link {
            color: #24292e;
            font-weight: bold;
            &::before {
              background-color: #373e7a;
            }
          }
        `
      )}
    />
  );
};

export {TocSp};
