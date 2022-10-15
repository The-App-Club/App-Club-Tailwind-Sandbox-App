import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '@/components/story/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import {motion} from 'framer-motion';
import Header from '@/components/story/edit/Header';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import data from '@/data/stories.json';
import Spacer from '@/components/Spacer';

const Story = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {id} = router.query;

  const item = useMemo(() => {
    return data.find((item) => {
      return item.storyId === id;
    });
  }, [id]);

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

          <Header item={item} />
          <Spacer />
          <div className="flex items-center gap-2">
            <div
              className={cx(
                `w-full flex justify-center flex-col items-center`,
                `border-2  rounded-lg shadow-lg p-2`
              )}
            >
              <p>Not yet published? Here create new.</p>
              <Link href={`/story/${item.storyId}/create`}>
                <a className="hover:underline">Create new story</a>
              </Link>
            </div>

            <div
              className={cx(
                `w-full flex justify-center flex-col items-center`,
                `border-2  rounded-lg shadow-lg p-2`
              )}
            >
              <p>Editting now? Continue below link.</p>
              <Link href={`/story/${item.storyId}/edit`}>
                <a className="hover:underline">Edit story</a>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cx(
                `w-full flex justify-center flex-col items-center`,
                `border-2  rounded-lg shadow-lg p-2`
              )}
            >
              <p>
                Do you like this story? If you like, Subscribe then, Copy this
                story.
              </p>
              <Link href={`/subscribe`}>
                <a className="hover:underline">Now Subscribe!</a>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Story;
