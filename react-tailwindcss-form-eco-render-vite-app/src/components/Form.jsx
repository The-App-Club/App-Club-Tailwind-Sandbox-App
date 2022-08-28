import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {default as FormEmail} from './FormEmail';
import {default as FormPassword} from './FormPassword';
import {useFormChecker} from '../hooks/useFormChecker';
import {Loading} from './Loading';
import {renderMessage} from './Message';

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    emailChecker,
    passwordChecker,
    setShowEmailErrorMessage,
    setShowPasswordErrorMessage,
  } = useFormChecker((state) => {
    return {
      emailChecker: state.emailChecker,
      passwordChecker: state.passwordChecker,
      setShowEmailErrorMessage: state.setShowEmailErrorMessage,
      setShowPasswordErrorMessage: state.setShowPasswordErrorMessage,
    };
  });

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

  const yesYouCan = useCallback(
    async ({showSuccessMessage, emailChecker, passwordChecker}) => {
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
    },
    []
  );

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
      <FormEmail
        ref={emailRef}
        showSuccessMessage={showSuccessMessage}
        yesYouCan={yesYouCan}
        setDisabled={setDisabled}
      />
      <FormPassword
        ref={passwordRef}
        showSuccessMessage={showSuccessMessage}
        yesYouCan={yesYouCan}
        setDisabled={setDisabled}
      />
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
