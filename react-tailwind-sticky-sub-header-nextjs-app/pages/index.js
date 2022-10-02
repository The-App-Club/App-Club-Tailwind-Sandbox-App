import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import styles from '../styles/pages/home/index.module.scss';
import Sidebar from '../components/Sidebar';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import Tracer from '../components/Tracer';
import Category from '../components/Category';

const Home = () => {
  const {opened} = useRecoilValue(hamburgerState);

  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12 px-2 pb-2`,
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
                z-index: 2;
                position: sticky;
                top: 3rem;
                width: 100%;
                ol {
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
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
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 2;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `,
              `bg-white dark:bg-slate-700`
            )}
          >
            <h2
              className={cx(`text-3xl flex items-center justify-start`, css``)}
            >
              Home
            </h2>
          </div>
          <Category />
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 2rem;
                @media (max-width: 1000px) {
                  flex-direction: column;
                }
              `
            )}
          >
            <div className="w-full">
              <h2
                className={cx(`text-xl flex items-center justify-start`, css``)}
              >
                Content
              </h2>
            </div>
            <Tracer
              className={css`
                position: sticky;
                top: 15rem;
              `}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
