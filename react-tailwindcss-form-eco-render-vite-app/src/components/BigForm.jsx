import {css, cx} from '@emotion/css';
import {BsEye} from 'react-icons/bs';
import {BsEyeSlash} from 'react-icons/bs';
import {useEffect, useMemo, useRef, useState} from 'react';

import {Layout} from '../layouts/popup';
import {Spacer} from './Spacer';
import {Message} from './Message';

import * as yup from 'yup';
import YupPassword from 'yup-password';
import {Loading} from './Loading';
YupPassword(yup);

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [showEmailSuccessMessage, setShowEmailSuccessMessage] = useState(null);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(null);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(null);
  const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] =
    useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailChecker = useMemo(() => {
    return yup.string().email().required();
  }, []);

  const passwordChecker = useMemo(() => {
    // https://github.com/knicola/yup-password/blob/master/index.js#L91-L99
    return yup.string().password().required();
  }, []);

  const handleSubmit = async (e) => {
    // validation... like yup
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let correctEmail,
      correctPassword = null;
    try {
      const resultEmailCheck = await emailChecker.validate(email);
      correctEmail = resultEmailCheck;
    } catch (error) {
      setShowEmailErrorMessage(error.message);
      return;
    }
    try {
      const resultPasswordCheck = await passwordChecker.validate(password);
      correctPassword = resultPasswordCheck;
    } catch (error) {
      setShowPasswordErrorMessage(error.message);
      return;
    }
    if (!correctEmail) {
      return;
    }
    if (!correctPassword) {
      return;
    }
    console.log(`correctEmail, correctPassword`, correctEmail, correctPassword);
    setLoading(true);
    setDisabled(true);
    setTimeout(() => {
      setShowSuccessMessage('Nice work!');
      setLoading(false);
    }, 1300);
  };

  const yesYouCan = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await emailChecker.validate(email);
      await passwordChecker.validate(password);
      if (showSuccessMessage) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(true);
    }
  };

  const handleChangeEmail = async (e) => {
    const email = emailRef.current.value;
    try {
      await emailChecker.validate(email);
      setShowEmailErrorMessage('');
      setShowEmailSuccessMessage('Great Email!');
      await yesYouCan();
    } catch (error) {
      setShowEmailErrorMessage(error.message);
      setShowEmailSuccessMessage('');
      setDisabled(true);
      return;
    }
  };

  const handleChangePassword = async (e) => {
    const password = passwordRef.current.value;
    try {
      await passwordChecker.validate(password);
      setShowPasswordErrorMessage('');
      setShowPasswordSuccessMessage('Great Password!');
      await yesYouCan();
    } catch (error) {
      setShowPasswordErrorMessage(error.message);
      setShowPasswordSuccessMessage('');
      setDisabled(true);
      return;
    }
  };

  useEffect(() => {
    setDisabled(true);
  }, [showSuccessMessage]);

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
      return <Spacer height="2.5rem" />;
    }
  };

  const handleShowPassword = (e) => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <form
      className={css`
        width: 100%;
        max-width: 18rem;
      `}
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
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
          ref={emailRef}
          onChange={handleChangeEmail}
          onBlur={handleChangeEmail}
          // onKeyUp={handleChangeEmail}
        />
        {renderMessage({
          successMessage: showEmailSuccessMessage,
          errorMessage: showEmailErrorMessage,
          initialMessage: '',
        })}
      </div>
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
        <div className="flex items-center gap-2">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={cx(
              css``,
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none mb-2',
              `${
                showPasswordErrorMessage
                  ? 'focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'
              }`
            )}
            ref={passwordRef}
            onChange={handleChangePassword}
            onBlur={handleChangePassword}
            // onKeyUp={handleChangePassword}
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
      <div
        className={cx(
          css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            @media (max-width: 768px) {
            }
          `
        )}
      >
        {renderMessage({
          infoMessage: showSuccessMessage,
          initialMessage: '',
        })}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={disabled}
          className={cx(
            css`
              position: relative;
              width: 60%;
              @media (max-width: 768px) {
                width: 60%;
              }
            `,
            'text-white bg-blue-700 font-medium rounded-lg text-sm px-6 py-2 text-center',
            `focus:ring-4 focus:outline-none focus:ring-blue-300`,
            `hover:bg-blue-800 hover:cursor-pointer`,
            `disabled:bg-slate-700 disabled:opacity-60`
          )}
        >
          {`Sign Up`}
          {loading ? (
            <Loading
              className={css`
                position: absolute;
                top: 5px;
                right: 2px;
              `}
            />
          ) : null}
        </button>
      </div>
    </form>
  );
};

export {Form};
