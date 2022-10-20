import { css, cx } from '@emotion/css';
import { motion, useTransform, useScroll } from 'framer-motion';
import easing from 'bezier-easing';
import logo from '@/assets/logo.png';
import { Spacer } from '@/components/Spacer';
import { Layout } from '@/layouts/default';
import { Paragraph1 } from '@/components/Paragraph1';
import { Paragraph2 } from '@/components/Paragraph2';
import { Paragraph3 } from '@/components/Paragraph3';

const doEaseOutExpo = (x) => {
  // https://easings.net/#easeOutExpo
  return easing(0.16, 1, 0.3, 1)(x);
};

const doEaseOutQuart = (x) => {
  // https://easings.net/#easeOutQuart
  return easing(0.25, 1, 0.5, 1)(x);
};

const doEaseOutElastic = (x) => {
  // https://easings.net/#easeOutElastic
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [0, 1, 1, 0],
    { ease: doEaseOutExpo }
  );
  const x = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [-30, 0, 0, -30], {
    ease: doEaseOutExpo,
  });
  const y = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [70, 0, 0, 70], {
    ease: doEaseOutExpo,
  });

  return (
    <Layout>
      <div
        className={cx(
          css`
            position: sticky;
            top: 3rem;
            left: 0;
            width: 100%;
            height: calc(50vh - 3rem);
            @media (max-width: 768px) {
            }
          `,
          `flex items-center justify-center flex-col`
        )}
      >
        <motion.img
          style={{
            opacity,
            x,
            y,
          }}
          src={logo}
          alt={'logo'}
          width={320}
        />
      </div>
      <div
        className={css`
          width: 100%;
          margin-top: 50%;
        `}
      >
        <section className="min-h-[200vh] p-2 max-w-md m-auto">
          <Paragraph1 />
          <Spacer height="70vh" />
          <Paragraph2 />
          <Spacer height="90vh" />
          <Paragraph3 />
          <Spacer height="40vh" />
        </section>
      </div>
    </Layout>
  );
};

export { HomePage };
