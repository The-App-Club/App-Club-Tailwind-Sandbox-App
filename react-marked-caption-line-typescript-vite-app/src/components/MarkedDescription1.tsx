import { css, cx } from "@emotion/css";

const MarkedDescription1 = () => {
  return (
    <aside
      className={cx(
        css`
          width: 12rem;
          height: 16rem;
          position: absolute;
          top: 0;
          right: -18rem;
          padding: 1rem;
          ::before {
            content: " ";
            width: 180px;
            height: 3px;
            position: absolute;
            top: 1rem;
            left: 0;
            transform-origin: top left;
            rotate: 154deg;
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`
      )}
    >
      <p className={cx("capitalize-first", "first-letter:text-3xl")}>
        lorem Ipsum is simply dummy text of the printing and typesetting
        industry.Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </p>
    </aside>
  );
};

export { MarkedDescription1 };
