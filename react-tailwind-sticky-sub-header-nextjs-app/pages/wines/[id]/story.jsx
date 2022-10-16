import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useEffect, useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import ScatterGraph from '@/components/ScatterGraph';
import Sidebar from '@/components/Sidebar';
import Spacer from '@/components/Spacer';
import Footer from '@/components/wines/[id]/story/Footer';
import Header from '@/components/wines/[id]/story/Header';
import ScrollStory from '@/components/wines/[id]/story/ScrollStory';
import ScrollStory2 from '@/components/wines/[id]/story/ScrollStory2';
import TraceFooter from '@/components/wines/[id]/story/TraceFooter';
import data from '@/data/wines.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';
import wineState from '@/stores/wineStore';

const Story = () => {
  const [activeWine, setActiveWine] = useRecoilState(wineState);
  const {opened} = useRecoilValue(hamburgerState);
  const router = useRouter();
  const {id} = router.query;
  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  useEffect(() => {
    setActiveWine({
      activeWine: item,
    });
  }, [item, setActiveWine]);

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
                position: initial;
                top: initial;
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
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
              if (niceTitle === `Story`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />

          <ScrollStory />

          <Spacer height="50vh" />

          <ScatterGraph />

          <Spacer height="50vh" />

          <ScrollStory2 />

          <Footer item={item} />
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Story;
