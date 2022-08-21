import {css, cx} from '@emotion/css';

const Footer = () => {
  return (
    <footer
      className={cx(
        css``,
        `text-xl flex justify-center items-center`,
        `border-t-2`,
        `pt-2 pb-2`,
        `dark:bg-slate-700 dark:text-white`
      )}
    >
      Bye
    </footer>
  );
};

export {Footer};
