import { css, cx } from "@emotion/css";

const MarkedDescription3 = () => {
  return (
    <aside
      className={cx(
        css`
          width: 12rem;
          height: 16rem;
          position: absolute;
          top: calc(16rem + 62px);
          left: 0;
          padding: 1rem;
          ::before {
            content: " ";
            width: 160px;
            height: 3px;
            position: absolute;
            top: 0;
            right: -130px;
            transform-origin: top left;
            rotate: -64deg;
          }
        `,
        `border-gray-300 border-2`,
        `before:content-[' '] before:bg-gray-300`
      )}
    >
      <p className={cx("capitalize-first", "first-letter:text-3xl")}>
        page when looking at its layout. The point of using Lorem Ipsum is that
        it has a more-or-less normal distribution of letters.
      </p>
    </aside>
  );
};

export { MarkedDescription3 };
