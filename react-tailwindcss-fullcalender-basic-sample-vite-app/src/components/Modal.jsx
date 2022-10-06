import { css, cx } from '@emotion/css';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ show, handleClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 z-10 bg-black/40 min-h-screen"
        >
          <motion.div className="relative w-full h-full">
            <div
              className={cx(
                `bg-white max-w-lg p-2`,
                css`
                  width: 100%;
                  min-width: 300px;
                  min-height: 400px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                `
              )}
            >
              <button
                type="button"
                className={cx(
                  'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center',
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
              <h2 className="text-2xl mt-10 flex items-center justify-center">
                Modal Header
              </h2>
              <div>
                <p>Modal Sentence</p>
                <p>Modal Sentence</p>
                <p>Modal Sentence</p>
                <p>Modal Sentence</p>
                <p>Modal Sentence</p>
                <p>Modal Sentence</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { Modal };
