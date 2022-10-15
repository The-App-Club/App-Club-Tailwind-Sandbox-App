import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '@/components/story/edit/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import {motion} from 'framer-motion';
import Header from '@/components/story/edit/Header';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {default as chance} from 'chance';
import Footer from '@/components/story/edit/Footer';
import data from '@/data/wines.json';

const EditStory = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const router = useRouter();
  const {id} = router.query;

  const item = useMemo(() => {
    return data.find((item) => {
      const storyId = chance(item.wine).string({alpha: true});
      return storyId === id;
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
              if (niceTitle === `Edit`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <Header />
          <Footer item={item} />
        </section>
      </Layout>
    </>
  );
};

export default EditStory;
