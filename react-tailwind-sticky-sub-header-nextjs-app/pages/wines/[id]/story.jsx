import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import hamburgerState from '../../../stores/hamburgerStore';
import data from '../../../data/wines.json';
import capitalize from 'capitalize-the-first-letter';
import TraceFooter from '../../../components/TraceFooter';
import Sidebar from '../../../components/Sidebar';
import Layout from '../../../layouts/default';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn} from 'react-icons/md';
import {css, cx} from '@emotion/css';
import ScrollStory from '../../../components/ScrollStory';

const Story = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {id} = router.query;

  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
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
              if (niceTitle === `Story`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 3;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `,
              `bg-white dark:bg-slate-700`,
              css`
                @media (max-width: 768px) {
                  padding: 0.5rem 0;
                }
              `
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2`,
                css`
                  @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                  }
                `
              )}
            >
              Scroll Story@{item.wine}
              <span className="text-sm font-bold flex items-center gap-1">
                <GiGrapes size={28} />
                {`${item.winery}`}
              </span>
              <span className="text-sm font-bold flex items-center gap-1">
                <MdOutlineLocationOn size={28} />
                {`${item.location}`}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center">
                Add Cart
              </button>
            </div>
          </div>

          <ScrollStory />

          {/* <div>
            <p>Here Mapbox Story Telling</p>
            <p>Here Mapbox Story Telling</p>
            <p>Here Mapbox Story Telling</p>
            <p>Here Mapbox Story Telling</p>
            <p>Here Mapbox Story Telling</p>
            <p>Here Mapbox Story Telling</p>
          </div> */}
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Story;
