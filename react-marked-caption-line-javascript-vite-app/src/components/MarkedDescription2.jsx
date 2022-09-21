import { css, cx } from "@emotion/css";

const MarkedDescription2 = () => {
  return (
    <aside
      className={cx(
        css`
          width: 12rem;
          height: 16rem;
          position: absolute;
          top: 0;
          left: -12rem;
          padding: 1rem;
          ::before {
            content: " ";
            width: 180px;
            height: 3px;
            position: absolute;
            top: 1rem;
            right: -180px;
            transform-origin: top left;
            rotate: 28deg;
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`
      )}
    >
      <p className={cx("capitalize-first", "first-letter:text-3xl")}>
        you are going to use a passage of Lorem Ipsum, you need to be sure there
        isn't anything embarrassing hidden in the middle of text
      </p>
    </aside>
  );
};

export { MarkedDescription2 };
