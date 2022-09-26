import {css, cx} from '@emotion/css';
import {motion, AnimatePresence} from 'framer-motion';
import {Spacer} from './Spacer';

const motionConfig = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 20,
    opacity: 0,
  },
};

const Message = ({message, type = 'danger'}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={'initial'}
          animate={'animate'}
          exit={'hidden'}
          variants={motionConfig}
          transition={{duration: 0.4, ease: 'easeInOut'}}
          className={cx(
            css`
              width: 100%;
              display: flex;
              justify-content: flex-start;
            `,
            `rounded-lg px-2 font-bold`,
            `${type === 'danger' ? 'bg-red-100 text-red-700' : ''}`,
            `${type === 'info' ? 'bg-blue-100 text-blue-700' : ''}`,
            `${type === 'success' ? 'bg-green-100 text-green-700' : ''}`
          )}
        >
          <p className="py-2 text-xs flex items-center">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const renderMessage = ({
  successMessage,
  errorMessage,
  infoMessage,
  initialMessage,
}) => {
  if (successMessage) {
    return <Message message={successMessage} type={'success'} />;
  } else if (errorMessage) {
    return <Message message={errorMessage} type={'danger'} />;
  } else if (infoMessage) {
    return <Message message={infoMessage} type={'info'} />;
  } else {
    return <Spacer height="2rem" />;
  }
};

export {Message, renderMessage};
