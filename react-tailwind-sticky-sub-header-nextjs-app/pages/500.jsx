import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRecoilValue} from 'recoil';

import Sidebar from '@/components/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const Custom500 = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12`,
            css`
              position: absolute;
              top: 0;
              left: 18rem;
              max-width: calc(100% - 18rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                left: 0;
                max-width: 100%;
              }
              nav {
                position: sticky;
                top: 3rem;
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
            inactiveItemClassName={'text-gray-500 dark:text-slate-500'}
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Home`) {
                return `${niceTitle}`;
              }
              return null;
            }}
          />
          <h2 className="text-3xl flex items-center justify-center">
            Something Went Wrong...
          </h2>
          <p className="flex items-center justify-center">something...</p>
        </section>
      </Layout>
    </>
  );
};

export default Custom500;
