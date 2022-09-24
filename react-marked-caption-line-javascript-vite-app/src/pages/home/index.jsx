import { css, cx } from '@emotion/css';

import logo from '../../assets/logo.png';
import { MarkedDescription1 } from '../../components/MarkedDescription1';
import { MarkedDescription2 } from '../../components/MarkedDescription2';
import { MarkedDescription3 } from '../../components/MarkedDescription3';
import { ScrollTriggerProvider } from '../../components/ScrollTriggerProvider';
import { Layout } from '../../layouts/default';

const HomePage = () => {
  return (
    <Layout>
      <ScrollTriggerProvider pcSectionHeight={'300%'} spSectionHeight={'600%'}>
        <section
          className={cx(
            `max-w-7xl mx-auto w-full relative flex flex-col items-center mt-12`,
            `overflow-x-hidden`,
            css`
              min-height: 100vh;
              @media (max-width: 768px) {
                min-height: max(100vw, 100vh);
              }
            `
          )}
        >
          <h2 className="text-3xl flex items-center justify-center">
            HomePage
          </h2>
          <p>Welcome Tokimeki Lion</p>
          <div className="relative">
            <img src={logo} alt={'logo'} />
            <MarkedDescription1 />
            <MarkedDescription2 />
            <MarkedDescription3 />
          </div>
        </section>
      </ScrollTriggerProvider>
    </Layout>
  );
};

export { HomePage };
