import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRecoilValue} from 'recoil';

import Sidebar from '@/components/wineries/[id]/stories/Sidebar';
import Header from '@/components/wineries/[id]/stories/Header';
import Container from '@/components/wineries/[id]/stories/Container';

import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import {useRouter} from 'next/router';
import dataWineryStories from '@/data/wineryStories.json';
import {useMemo} from 'react';
import Spacer from '@/components/Spacer';

const WineryStories = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);

  const userId = 'avDLMsS';
  const {id} = router.query;

  const item = useMemo(() => {
    return dataWineryStories.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  const myStories = useMemo(() => {
    if (!item) {
      return [];
    }

    return item.stories.filter((story) => {
      return story.userId === userId;
    });
  }, [userId, item]);

  if (!item) {
    return;
  }

  if (myStories.length === 0) {
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
              if (niceTitle === `Stories`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />
          <Spacer />
          <Container stories={myStories} />
        </section>
      </Layout>
    </>
  );
};

export default WineryStories;
