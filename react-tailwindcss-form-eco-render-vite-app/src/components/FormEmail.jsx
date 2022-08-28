import {css, cx} from '@emotion/css';
import {forwardRef, useMemo} from 'react';
import {memo, useState} from 'react';
import {renderMessage} from './Message';
import {useFormChecker} from '../hooks/useFormChecker';

const _FormEmail = ({showSuccessMessage, yesYouCan, setDisabled}, ref) => {
  const [showEmailSuccessMessage, setShowEmailSuccessMessage] = useState(null);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(null);
  const {emailChecker, passwordChecker} = useFormChecker((state) => {
    return {
      emailChecker: state.emailChecker,
      passwordChecker: state.passwordChecker,
    };
  });

  const handleChangeEmail = async (e) => {
    const email = ref.current.value;
    try {
      await emailChecker.validate(email);
      setShowEmailErrorMessage('');
      setShowEmailSuccessMessage('Great Email!');
      await yesYouCan({showSuccessMessage, emailChecker, passwordChecker});
    } catch (error) {
      setShowEmailErrorMessage(error.message);
      setShowEmailSuccessMessage('');
      setDisabled(true);
      return;
    }
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="email"
        className="block pb-2 text-lg font-medium text-gray-900"
      >
        Your email
      </label>
      <p className="text-gray-600 text-sm font-medium pb-2">
        We'll never share your email with anyone else.
      </p>
      <input
        type="email"
        id="email"
        className={cx(
          css``,
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none mb-2',
          `${
            showEmailErrorMessage
              ? 'focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500'
          }`
        )}
        placeholder="sample@example.com"
        ref={ref}
        onChange={handleChangeEmail}
        onBlur={handleChangeEmail}
      />
      {renderMessage({
        successMessage: showEmailSuccessMessage,
        errorMessage: showEmailErrorMessage,
        initialMessage: '',
      })}
    </div>
  );
};

const FormEmail = forwardRef(_FormEmail);

export default memo(FormEmail);
