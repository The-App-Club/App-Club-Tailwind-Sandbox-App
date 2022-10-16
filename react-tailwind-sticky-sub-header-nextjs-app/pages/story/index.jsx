import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {default as numbro} from 'numbro';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import Header from '@/components/story/Header';
import Sidebar from '@/components/story/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';



const Story = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const router = useRouter();
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
            <div
              className={cx(
                `w-full flex flex-col items-center justify-center min-h-[20rem] border-2`,
                `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`
              )}
              onClick={(e) => {
                router.push({
                  pathname: `/story/wines`,
                });
              }}
            >
              <h3 className="text-xl">See Wine Story</h3>
              <GiWineBottle size={64} />
              <p className="font-bold">{`Today ${numbro(32030).format({
                thousandSeparated: true,
              })} stories published`}</p>
            </div>
            <div
              className={cx(
                `w-full flex flex-col items-center justify-center min-h-[20rem] border-2`,
                `hover:bg-gray-100 dark:hover:bg-slate-800 hover:cursor-pointer`
              )}
              onClick={(e) => {
                router.push({
                  pathname: `/story/wineries`,
                });
              }}
            >
              <h3 className="text-xl">See Winery Story</h3>
              <GiGrapes size={64} />
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
