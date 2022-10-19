import { cx } from '@emotion/css';

const Paragraph2 = () => {
  return (
    <p className={cx(`p-2 border-2 shadow-lg rounded-lg`)}>
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout.
    </p>
  );
};

export { Paragraph2 };
