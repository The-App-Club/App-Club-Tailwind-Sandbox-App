import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import Container from '@/components/wines/[id]/stories/[storyId]/Container';
import Header from '@/components/wines/[id]/stories/[storyId]/Header';
import Product from '@/components/wines/[id]/stories/[storyId]/Product';
import Sidebar from '@/components/wines/[id]/stories/[storyId]/Sidebar';
import dataWineChapters from '@/data/wineChapters.json';
import dataWineStories from '@/data/wineStories.json';
import dataWines from '@/data/wines.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const WineStory = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);

  const userId = 'avDLMsS';
  const {id, storyId} = router.query;

  const item = useMemo(() => {
    return dataWineStories.find((item) => {
      return item.wineId === Number(id);
    });
  }, [id]);

  const myStory = useMemo(() => {
    if (!item) {
      return;
    }
    return item.stories.find((story) => {
      return story.storyId === storyId;
    });
  }, [storyId, item]);

  const myChapter = useMemo(() => {
    return dataWineChapters.find((item) => {
      return item.storyId === storyId;
    });
  }, [storyId]);

  const activeWine = useMemo(() => {
    return dataWines.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  if (!item) {
    return;
  }

  if (!myStory) {
    return;
  }

  if (!myChapter) {
    return;
  }

  if (!activeWine) {
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
              if (title === storyId) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header item={myStory} />
          <Spacer />
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 3rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <Container chapters={myChapter.chapters} />
            <aside
              className={cx(
                css`
                  max-width: 34rem;
                  width: 100%;
                  position: sticky;
                  top: calc(9rem + 16px);
                  z-index: 1;
                  min-height: 20rem; // mock attach
                  display: none;
                  @media (max-width: 1000px) {
                    max-width: 100%;
                  }
                  @media (max-width: 768px) {
                    display: block;
                  }
                `,
                `bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
                `border-2 border-gray-200 dark:border-slate-500`
              )}
            >
              <Product item={activeWine} />
            </aside>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default WineStory;
