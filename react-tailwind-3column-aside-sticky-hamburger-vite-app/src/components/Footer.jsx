import {css, cx} from '@emotion/css';

const Footer = () => {
  return (
    <footer
      className={cx(
        css``,
        `text-xl flex justify-center items-center`,
        `border-t-2`,
        `pt-2 pb-2`
      )}
    >
      Bye
    </footer>
  );
};

export {Footer};
