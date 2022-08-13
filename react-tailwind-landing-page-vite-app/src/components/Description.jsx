import {AnimatePresence} from 'framer-motion';
import {css, cx} from '@emotion/css';
import {Layout} from '../layouts/popup';

const Description = ({tik, text}) => {
  return (
    <div
      className={cx(
        css``,
        `
        w-full flex justify-center items-center p-1
      `
      )}
    >
      {
        <AnimatePresence>
          {tik && (
            <Layout>
              <p className="font-bold">{text}</p>
            </Layout>
          )}
        </AnimatePresence>
      }
    </div>
  );
};

export {Description};
