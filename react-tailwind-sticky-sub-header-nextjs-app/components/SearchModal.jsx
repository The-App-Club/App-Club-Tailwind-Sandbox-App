import {css, cx} from '@emotion/css';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hidden: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const SearchModal = ({show, handleClose}) => {
  //
  const handleResize = useDebouncedCallback((e) => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 600);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 bottom-0 z-10 bg-black/20 dark:bg-black/40 min-h-screen"
            onClick={(e) => {
              handleClose();
            }}
          />
          <motion.div
            initial={'initial'}
            animate={'animate'}
            exit={'hidden'}
            transition={{
              duration: 0.4,
              ease: 'backInOut',
            }}
            variants={motionConfig}
            onAnimationStart={(e) => {}}
            onAnimationComplete={(e) => {}}
            className={cx(
              `px-2`,
              `fixed z-10`,
              `bg-white dark:bg-slate-700 shadow-2xl`,
              css`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                max-width: 60rem;
                height: 38rem;
                margin: 5rem auto 0;
                @media (max-width: 768px) {
                  max-width: initial;
                  height: calc(calc(var(--vh, 1vh) * 100) - 6rem);
                  top: initial;
                }
              `
            )}
          >
            <button
              type="button"
              className={cx(
                `hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-slate-800 dark:hover:text-gray-200`,
                `text-gray-400 bg-transparent`,
                'rounded-lg text-sm p-1.5 ml-auto inline-flex items-center',
                `absolute top-0 right-0`
              )}
              onClick={handleClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <h2
              className={cx(
                'text-2xl mt-10 flex items-center justify-center shadow-md',
                css`
                  position: sticky;
                  top: 3rem;
                  min-height: 3rem;
                `
              )}
            >
              Search
            </h2>
            <div
              className={cx(
                'overflow-hidden overflow-y-auto',
                css`
                  position: relative;
                  height: calc(100% - calc(6rem + 3rem));
                `
              )}
            >
              {[...Array(40).keys()].map((_, index) => {
                return <p key={index}>Something...</p>;
              })}
            </div>
            <div className="w-full border-t-2">
              <div
                className={cx(
                  'flex items-center justify-between gap-2 py-2 w-full max-w-xs m-auto',
                  css`
                    position: sticky;
                    bottom: 0;
                    min-height: 3rem;
                  `
                )}
              >
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                  onClick={(e) => {
                    handleClose();
                  }}
                >
                  Cancel
                </button>
                <div className="flex items-center flex-col">
                  <span className="text-sm">{`Matched`}</span>
                  <span className="text-sm">{`${1}items`}</span>
                </div>
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                  onClick={(e) => {
                    console.log(e);
                    handleClose();
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
