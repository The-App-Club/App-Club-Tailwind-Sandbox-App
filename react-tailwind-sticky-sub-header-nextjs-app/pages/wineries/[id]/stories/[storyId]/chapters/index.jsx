import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import Container from '@/components/wineries/[id]/stories/[storyId]/chapters/Container';
import Header from '@/components/wineries/[id]/stories/[storyId]/chapters/Header';
import Sidebar from '@/components/wineries/[id]/stories/[storyId]/chapters/Sidebar';
import dataWineryChapters from '@/data/wineryChapters.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const StoryChapters = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);

  const userId = 'avDLMsS';
  const {id, storyId} = router.query;

  const item = useMemo(() => {
    return dataWineryChapters.find((item) => {
      return item.storyId === storyId && item.userId === userId;
    });
  }, [storyId, userId]);

  const myChapters = useMemo(() => {
    if (!item) {
      return [];
    }

    return item.chapters;
  }, [item]);

  if (!item) {
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
              if (niceTitle === `Chapters`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />
          <Spacer />
          <Container chapters={myChapters} />
        </section>
      </Layout>
    </>
  );
};

export default StoryChapters;
