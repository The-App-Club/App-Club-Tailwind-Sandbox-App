import { cx } from '@emotion/css';

const Paragraph1 = () => {
  return (
    <p className={cx(`p-2 border-2 shadow-lg rounded-lg`)}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s
    </p>
  );
};

export { Paragraph1 };
