import create from 'zustand';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
const useFormChecker = create((set) => {
  return {
    emailChecker: yup.string().email().required(),
    passwordChecker: yup.string().password().required(),
    setShowEmailErrorMessage: () => {},
    setShowPasswordErrorMessage: () => {},
  };
});

export {useFormChecker};
