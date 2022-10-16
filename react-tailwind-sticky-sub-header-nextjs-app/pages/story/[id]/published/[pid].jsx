import {css, cx} from '@emotion/css';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import {useMemo} from 'react';

import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import dataWines from '@/data/wines.json';
import dataWineStories from '@/data/wineStories.json';
import Spacer from '@/components/Spacer';
import Header from '@/components/story/wineries/[id]/published/[pid]/Header';
import Sidebar from '@/components/story/wineries/[id]/published/[pid]/Sidebar';
import Footer from '@/components/story/wineries/[id]/published/[pid]/Footer';

const PublishedStory = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {id, pid} = router.query;

  const item = useMemo(() => {
    return dataWineStories.find((d) => {
      return d.wineId === Number(id);
    });
  }, [id]);

  const activeWine = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWines.find((d) => {
      return d.id === item.wineId;
    });
  }, [item]);

  const activeStory = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWineStories
      .find((d) => {
        return d.wineId === item.wineId;
      })
      .stories.find((d) => {
        return d.storyId === pid;
      });
  }, [item, pid]);

  if (!item) {
    return;
  }

  if (!activeWine) {
    return;
  }

  if (!activeStory) {
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
              if (title === pid) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <Header item={activeWine} storyItem={activeStory} />
          <Spacer />
          <p>At here published scroll story.</p>
          <Footer />
        </section>
      </Layout>
    </>
  );
};

export default PublishedStory;
