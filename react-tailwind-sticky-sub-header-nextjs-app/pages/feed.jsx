import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import Feeder from '@/components/feed/Feeder';
import Header from '@/components/feed/SectionHeader';
import Sidebar from '@/components/feed/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const Feed = () => {
  // https://winefolly.com/tips/what-is-wine-body-and-how-to-taste-it/
  const {opened} = useRecoilValue(hamburgerState);
  const containerDomRef = useRef(null);
  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12 px-2 pb-2`,
            css`
              /* position: absolute; */
              position: relative;
              top: 0;
              left: 18rem;
              max-width: calc(100% - 18rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                position: initial;
                top: initial;
                left: initial;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                @media (max-width: 768px) {
                  z-index: 3;
                  position: initial;
                  top: initial;
                }
                width: 100%;
                padding: 0 0.5rem;
                ol {
                  font-size: 0.875rem /* 14px */;
                  line-height: 1.25rem /* 20px */;
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  gap: 0.5rem;
                }
              }
            `
          )}
        >
          <Breadcrumbs
            useDefaultStyle={true}
            replaceCharacterList={[{from: '.', to: ' '}]}
            containerClassName="bg-white dark:bg-slate-700"
            activeItemClassName={'text-gray-500 dark:text-slate-500'}
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Feed`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <Header />
          <Spacer />
          <Feeder />
        </section>
      </Layout>
    </>
  );
};

export default Feed;
