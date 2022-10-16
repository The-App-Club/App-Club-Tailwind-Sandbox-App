import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { useMemo} from 'react';
import { useRecoilValue} from 'recoil';

import Footer from '@/components/story/wineries/[id]/create/Footer';
import Header from '@/components/story/wineries/[id]/create/Header';
import ScrollStory from '@/components/story/wineries/[id]/create/ScrollStory';
import Sidebar from '@/components/story/wineries/[id]/create/Sidebar';
import dataWineries from '@/data/wineries.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';



const CreateStory = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const router = useRouter();
  const {id} = router.query;

  const activeWinery = useMemo(() => {
    return dataWineries.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  if (!activeWinery) {
    return;
  }

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
              if (niceTitle === `Create`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header item={activeWinery} />
          <ScrollStory />
          <Footer item={activeWinery} />
        </section>
      </Layout>
    </>
  );
};

export default CreateStory;
