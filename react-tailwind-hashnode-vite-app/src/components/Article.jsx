import {css, cx} from '@emotion/css';
import {LoremIpsum, name} from 'react-lorem-ipsum';

const makeSlugURL = () => {
  return name().toLowerCase();
};

const Article = () => {
  return (
    <section
      className={cx(
        css`
          width: 100%;
          h1 {
            font-size: 2rem;
          }
          h2 {
            font-size: 1.7rem;
          }
          h3 {
            font-size: 1.4rem;
          }
          p {
            font-size: 1.2rem;
          }
          h1:not(:first-child),
          h2,
          h3 {
            padding: 1rem 0 0;
          }
        `,
        `blog`
      )}
    >
      <h1 id={makeSlugURL()}>Chapter 1</h1>
      <LoremIpsum random={false} p={2} />
      <h2 id={makeSlugURL()}>Section 1</h2>
      <LoremIpsum random={false} p={2} />
      <h3 id={makeSlugURL()}>Section 1-1</h3>
      <LoremIpsum random={false} p={3} />
      <h3 id={makeSlugURL()}>Section 1-2</h3>
      <LoremIpsum random={false} p={2} />
      <h2 id={makeSlugURL()}>Section 2</h2>
      <LoremIpsum random={false} p={2} />
      <h3 id={makeSlugURL()}>Section 2-1</h3>
      <LoremIpsum random={false} p={3} />
      <h1 id={makeSlugURL()}>Chapter 2</h1>
      <LoremIpsum random={false} p={3} />
      <h2 id={makeSlugURL()}>Section 1</h2>
      <LoremIpsum random={false} p={2} />
      <h2 id={makeSlugURL()}>Section 2</h2>
      <LoremIpsum random={false} p={2} />
      <h2 id={makeSlugURL()}>Section 3</h2>
      <LoremIpsum random={false} p={2} />
      <h1 id={makeSlugURL()}>Chapter 3</h1>
      <LoremIpsum random={false} p={3} />
    </section>
  );
};

export {Article};
