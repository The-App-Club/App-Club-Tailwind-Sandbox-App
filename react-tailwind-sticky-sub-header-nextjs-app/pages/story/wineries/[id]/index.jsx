import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';


import Spacer from '@/components/Spacer';
import GalleryItem from '@/components/story/wineries/[id]/GalleryItem';
import Header from '@/components/story/wineries/[id]/Header';
import Sidebar from '@/components/story/wineries/[id]/Sidebar';
import dataWineries from '@/data/wineries.json';
import dataWineryStories from '@/data/wineryStories.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import wineryState from '@/stores/wineryStore';

const Story = () => {
  const router = useRouter();
  const [winery, setWinery] = useRecoilState(wineryState);
  const {opened} = useRecoilValue(hamburgerState);
  const {id} = router.query;

  const item = useMemo(() => {
    return dataWineryStories.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  const activeWinery = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWineries.find((d) => {
      return d.wineryId === item.wineryId;
    });
  }, [item]);

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
              if (title === id) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <Header item={activeWinery} />
          <Spacer />
          <h2>My Stories</h2>

          <div>HERE MY PUBLISHED Stories Gallery</div>

          <GalleryItem item={activeWinery} storyItem={item} />

          {item.stories.length === 0 ? (
            <div
              className={cx(
                `w-full flex justify-center flex-col items-center`,
                `border-2  rounded-lg shadow-lg p-2`
              )}
            >
              <p>Not yet published? Here create new.</p>

              <button
                className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
                onClick={(e) => {
                  setWinery({
                    activeWinery,
                  });
                  router.push({
                    pathname: `/story/wineries/${id}/create`,
                  });
                }}
              >
                Create story
              </button>
            </div>
          ) : (
            <div
              className={cx(
                `w-full flex justify-center flex-col items-center`,
                `border-2  rounded-lg shadow-lg p-2`
              )}
            >
              <p>Someone already published some stories. See stories.</p>

              <button
                className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
                onClick={(e) => {
                  router.push({
                    pathname: `/story/wineries/${id}/published`,
                  });
                }}
              >
                See story
              </button>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
};

export default Story;
