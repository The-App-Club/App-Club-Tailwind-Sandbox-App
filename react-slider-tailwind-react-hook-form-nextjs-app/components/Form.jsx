import {useRef, useState} from 'react';
import {css, cx} from '@emotion/css';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {renderMessage} from './Message';
import {Spacer} from './Spacer';
import {BsEye} from 'react-icons/bs';
import {BsEyeSlash} from 'react-icons/bs';
import {MdArrowForwardIos} from 'react-icons/md';

import {Loading} from './Loading';
import {useRecoilState} from 'recoil';
import pageState from '../stores/pageStore';

YupPassword(yup);

const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('メールアドレスの形式が異なります')
    .required('必須入力です'),
  password: yup
    .string()
    .min(8, `少なくとも8文字以上です`)
    .max(20, `多くとも20文字以下です`)
    .minLowercase(1, `少なくとも小文字1文字以上を含めてください`)
    .minUppercase(1, `少なくとも大文字1文字以上を含めてください`)
    .minNumbers(1, `少なくとも数字1文字以上を含めてください`)
    .minSymbols(1, `少なくとも記号1文字以上を含めてください`)
    .required(`必須入力です`),
});

const Form = ({buttonText, successMessage, linkText, actionPageName}) => {
  const [page, setPage] = useRecoilState(pageState);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const [showEmailSuccessMessage, setEmailShowSuccessMessage] = useState(null);
  const [showEmailErrorMessage, setEmailShowErrorMessage] = useState(null);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(null);
  const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] =
    useState(null);

  const {register, handleSubmit, errors, watch} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setDisabled(true);
      console.log(data);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessMessage(successMessage);
        setShowErrorMessage('');
      }, 1200);
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      setShowSuccessMessage('');
      setShowErrorMessage(error.message);
      console.log(error);
    }
  };

  const handleShowPassword = (e) => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  const handleChangeEmail = async (e) => {
    const email = e.target.value;
    try {
      await SignUpSchema.fields.email.validate(email);
      setEmailShowSuccessMessage('有効なメールアドレスです');
      setEmailShowErrorMessage('');
      setDisabled(false);
      await yesYouCan();
    } catch (error) {
      setEmailShowSuccessMessage('');
      setEmailShowErrorMessage(error.message);
      setDisabled(true);
    }
  };

  const handleChangePassword = async (e) => {
    const password = e.target.value;
    try {
      await SignUpSchema.fields.password.validate(password);
      setShowPasswordErrorMessage('');
      setShowPasswordSuccessMessage('安全なパスワードです');
      setDisabled(false);
      await yesYouCan();
    } catch (error) {
      setShowPasswordSuccessMessage('');
      setShowPasswordErrorMessage(error.message);
      setDisabled(true);
    }
  };

  const yesYouCan = async () => {
    const {email, password} = watch();
    try {
      await SignUpSchema.fields.email.validate(email);
      await SignUpSchema.fields.password.validate(password);
      if (showSuccessMessage) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(true);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={css`
        width: 100%;
        max-width: 30rem;
      `}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          メールアドレス
        </label>
        <Spacer height="0.5rem" />
        <input
          id="email"
          type="email"
          name="email"
          className={cx(
            `block p-2.5`,
            `bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg w-full outline-none`,
            `${
              showEmailErrorMessage
                ? 'focus:ring-red-500 focus:border-red-500'
                : 'focus:ring-blue-500 focus:border-blue-500'
            }`
          )}
          placeholder="sample@example.com"
          {...register('email', {
            onChange: handleChangeEmail,
            onBlur: handleChangeEmail,
          })}
        />
        <Spacer height="0.5rem" />
        {renderMessage({
          successMessage: showEmailSuccessMessage,
          errorMessage: showEmailErrorMessage,
        })}
      </div>
      <Spacer height="0.5rem" />
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          パスワード
        </label>
        <Spacer height="0.5rem" />
        <p className="text-gray-800 dark:text-slate-200 text-sm font-medium">
          8文字以上、20文字以下、小文字1文字以上、大文字1文字以上、数字1文字以上、記号1文字以上。
        </p>
        <Spacer height="0.5rem" />
        <div className="flex items-center gap-2 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete={'new-password'}
            placeholder="半角英数字記号8〜20文字"
            className={cx(
              `block p-2.5`,
              `bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg w-full outline-none`,
              `${
                showPasswordErrorMessage
                  ? 'focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'
              }`
            )}
            {...register('password', {
              onChange: handleChangePassword,
              onBlur: handleChangePassword,
            })}
          />
          <div className="absolute top-3 right-2 flex items-center justify-center">
            {showPassword ? (
              <BsEye
                size={20}
                onClick={handleShowPassword}
                className={`hover:cursor-pointer text-black`}
              />
            ) : (
              <BsEyeSlash
                size={20}
                onClick={handleShowPassword}
                className={`hover:cursor-pointer text-black`}
              />
            )}
          </div>
        </div>
        <Spacer height="0.5rem" />
        {renderMessage({
          successMessage: showPasswordSuccessMessage,
          errorMessage: showPasswordErrorMessage,
        })}
      </div>
      <Spacer height="0.5rem" />
      <div className="flex justify-end items-center relative">
        <button
          disabled={disabled}
          type="submit"
          className={cx(
            `w-full`,
            `bg-blue-600 hover:bg-blue-800 text-white rounded-lg px-8 py-2`,
            `disabled:bg-slate-700 dark:disabled:bg-blue-800 disabled:opacity-60`
          )}
        >
          {buttonText}
        </button>
        {loading ? (
          <Loading
            className={css`
              position: absolute;
              top: 5px;
              right: 2px;
            `}
          />
        ) : null}
      </div>
      <Spacer height="0.5rem" />
      <div className="flex justify-end">
        <div
          className={cx(
            `relative flex items-center gap-2 hover:cursor-pointer`,
            `after:bg-blue-600`,
            css`
              &::after {
                position: absolute;
                bottom: -4px;
                left: 0;
                content: '';
                width: 100%;
                height: 2px;
                transform: scale(0, 1);
                transform-origin: left top;
                transition: transform 0.3s;
              }
              &:hover::after {
                transform: scale(1, 1);
              }
            `
          )}
          onClick={(e) => {
            setPage((prevState) => {
              return {
                pageName: actionPageName,
              };
            });
          }}
        >
          <span>{linkText}</span>
          <MdArrowForwardIos size={20} className={`text-blue-600`} />
        </div>
      </div>
      <Spacer height="0.5rem" />
      {renderMessage({
        infoMessage: showSuccessMessage,
        errorMessage: showErrorMessage,
      })}
    </form>
  );
};

export {Form};
