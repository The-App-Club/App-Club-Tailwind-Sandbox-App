import {css, cx} from '@emotion/css';

const AdsSidebar = ({className}) => {
  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          min-height: 30rem;
        `,
        `border-2  p-2 rounded-lg mb-2`,
        className
      )}
    >
      <ul
        className={css`
          min-width: 18rem;
          width: 100%;
        `}
      >
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
      </ul>
    </aside>
  );
};

export {AdsSidebar};
