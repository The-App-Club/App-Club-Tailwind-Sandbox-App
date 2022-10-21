import { cx } from '@emotion/css';

const Paragraph3 = () => {
  return (
    <p className={cx(`p-2 border-2 shadow-lg rounded-lg`)}>
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable.
    </p>
  );
};

export { Paragraph3 };
