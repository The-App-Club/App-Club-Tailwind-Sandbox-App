import {css, cx} from '@emotion/css';
import {useMemo} from 'react';
import zxcvbn from 'zxcvbn';
import {Spacer} from './Spacer';

const PasswordScore = ({password, children}) => {
  if (!password) {
    return <Spacer height="1.5rem" />;
  }
  const score = zxcvbn(password).score;
  const {width, message, bgColor, textColor} = useMemo(() => {
    switch (score) {
      case 0:
        return {
          width: 20,
          message: `so weak password`,
          bgColor: `bg-red-100`,
          textColor: `text-red-700`,
        };
        break;
      case 1:
        return {
          width: 40,
          message: `weak password`,
          bgColor: `bg-orange-100`,
          textColor: `text-orange-700`,
        };
        break;
      case 2:
        return {
          width: 60,
          message: `better password`,
          bgColor: `bg-yellow-100`,
          textColor: `text-yellow-700`,
        };
        break;
      case 3:
        return {
          width: 80,
          message: `good password`,
          bgColor: `bg-green-100`,
          textColor: `text-green-700`,
        };
        break;
      case 4:
        return {
          width: 100,
          message: `excellent password`,
          bgColor: `bg-blue-100`,
          textColor: `text-blue-700`,
        };
        break;
      default:
        break;
    }
  }, [score]);

  const childNode = useMemo(() => {
    return children({score, message, textColor});
  }, [children, score, message, textColor]);

  return (
    <div
      className={cx(
        css`
          height: 1.5rem;
          width: 100%;
        `,
        `flex items-center ${bgColor}`
      )}
    >
      {childNode}
    </div>
  );
};

export {PasswordScore};
