import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRecoilValue} from 'recoil';

import Spacer from '@/components/Spacer';
import Footer from '@/components/story/wines/[id]/published/[publishedId]/Footer';
import Header from '@/components/story/wines/[id]/published/[publishedId]/Header';
import Sidebar from '@/components/story/wines/[id]/published/[publishedId]/Sidebar';
import usePublishedStory from '@/hooks/usePublishedStory';
import useWine from '@/hooks/useWine';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const PublishedStory = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {id, publishedId} = router.query;
  const {activeWine} = useWine({id});
  const {activeStory} = usePublishedStory({id, publishedId});

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
              if (title === publishedId) {
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
