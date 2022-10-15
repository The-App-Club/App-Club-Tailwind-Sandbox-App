import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {default as numbro} from 'numbro';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import Sidebar from '@/components/story/Sidebar';
import Header from '@/components/story/Header';
import Spacer from '@/components/Spacer';

const Story = () => {
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
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                padding: 0 0.5rem;
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
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Story`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />
          <Spacer />
          <div className="w-full flex items-center gap-2">
            <div className="w-full flex flex-col items-center justify-center min-h-[20rem] border-2">
              <Link href={`/story/wines`}>
                <a className="hover:underline">See Wine Story</a>
              </Link>
              <p className="font-bold">{`Today ${numbro(32030).format({
                thousandSeparated: true,
              })} stories published`}</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center min-h-[20rem] border-2">
              <Link href={`/story/wineries`}>
                <a className="hover:underline">See Winery Story</a>
              </Link>
              <p className="font-bold">{`Today ${numbro(213).format({
                thousandSeparated: true,
              })} stories published`}</p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Story;
