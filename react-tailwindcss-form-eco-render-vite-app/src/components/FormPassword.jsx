import {css, cx} from '@emotion/css';
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import {renderMessage} from './Message';
import {forwardRef, memo, useMemo, useState} from 'react';
import {useFormChecker} from '../hooks/useFormChecker';
import {PasswordScore} from './PasswordScore';

const _FormPassword = ({showSuccessMessage, yesYouCan, setDisabled}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(null);
  const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] =
    useState(null);

  const {emailChecker, passwordChecker} = useFormChecker((state) => {
    return {
      emailChecker: state.emailChecker,
      passwordChecker: state.passwordChecker,
    };
  });

  const handleChangePassword = async (e) => {
    const password = ref.current.value;
    try {
      await passwordChecker.validate(password);
      setShowPasswordErrorMessage('');
      setShowPasswordSuccessMessage('Great Password!');
      await yesYouCan({showSuccessMessage, emailChecker, passwordChecker});
    } catch (error) {
      setShowPasswordErrorMessage(error.message);
      setShowPasswordSuccessMessage('');
      setDisabled(true);
      return;
    }
  };

  const handleShowPassword = (e) => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="password"
        className="block pb-2 text-lg font-medium text-gray-900"
      >
        Your password
      </label>
      <p className="text-gray-600 text-sm font-medium pb-2">
        at least 8 characters, at most 250 characters, at least 1 lowercase
        letter, at least 1 uppercase letter, at least 1 number and at least 1
        symbol.
      </p>
      <PasswordScore password={ref.current?.value}>
        {({score, message, textColor}) => {
          return (
            <p
              className={`text-sm font-bold flex items-center justify-center w-full ${textColor}`}
            >
              {message}
            </p>
          );
        }}
      </PasswordScore>
      <div className="flex items-center gap-2">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className={cx(
            css``,
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none my-2',
            `${
              showPasswordErrorMessage
                ? 'focus:ring-red-500 focus:border-red-500'
                : 'focus:ring-blue-500 focus:border-blue-500'
            }`
          )}
          ref={ref}
          onChange={handleChangePassword}
          onBlur={handleChangePassword}
        />
        {showPassword ? (
          <BsEye
            size={24}
            onClick={handleShowPassword}
            className={`hover:cursor-pointer`}
          />
        ) : (
          <BsEyeSlash
            size={24}
            onClick={handleShowPassword}
            className={`hover:cursor-pointer`}
          />
        )}
      </div>

      {renderMessage({
        successMessage: showPasswordSuccessMessage,
        errorMessage: showPasswordErrorMessage,
        initialMessage: '',
      })}
    </div>
  );
};

const FormPassword = forwardRef(_FormPassword);

export default memo(FormPassword);
