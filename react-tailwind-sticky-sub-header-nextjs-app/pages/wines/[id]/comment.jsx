import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import hamburgerState from '../../../stores/hamburgerStore';
import data from '../../../data/wines.json';
import capitalize from 'capitalize-the-first-letter';
import TraceFooter from '../../../components/TraceFooter';
import Sidebar from '../../../components/Sidebar';
import Layout from '../../../layouts/default';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn, MdOutlineTimeline} from 'react-icons/md';
import {css, cx} from '@emotion/css';
import ScrollStory from '../../../components/ScrollStory';
import ScatterGraph from '../../../components/ScatterGraph';
import ScrollStory2 from '../../../components/ScrollStory2';
import {useScrollDirection} from 'react-use-scroll-direction';
import {motion, useAnimationControls} from 'framer-motion';
import {scrollDirectionState} from '../../../stores/scrollDirectionStore';
import Spacer from '../../../components/Spacer';
import wineState from '../../../stores/wineStore';
import {FaRegComments} from 'react-icons/fa';

const Comment = () => {
  const [activeWine, setActiveWine] = useRecoilState(wineState);
  const headerControls = useAnimationControls();
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);
  const {id} = router.query;

  const {scrollDirection} = useScrollDirection();

  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  useEffect(() => {
    setActiveWine({
      activeWine: item,
    });

    return () => {
      setActiveWine({
        activeWine: null,
      });
    };
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
              if (niceTitle === `Comment`) {
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
                align-items: flex-start;
                gap: 0.5rem;
              `,
              `bg-white dark:bg-slate-700 shadow-md p-2`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex flex-col justify-start gap-1`,
                css`
                  @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                  }
                `
              )}
            >
              Comment
            </h2>
          </div>
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
                gap: 1rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <div
              className={cx(
                'w-full max-w-2xl',
                `border-2 bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
                css`
                  min-height: calc(100vh + 34rem); // mock attach
                `
              )}
            >
              <h2
                className={cx(
                  `text-lg flex items-center justify-start gap-1 border-b-2 mb-2 px-2`,
                  css`
                    min-height: 3rem;
                  `
                )}
              >
                <MdOutlineTimeline size={24} />
                Timeline
              </h2>
            </div>
            <aside
              className={cx(
                css`
                  width: 100%;
                  position: sticky;
                  top: calc(9rem + 16px);
                  z-index: 1;
                  min-height: 20rem; // mock attach
                  @media (max-width: 1000px) {
                    order: 2;
                    max-width: 100%;
                  }
                `,
                `border-2 bg-white dark:bg-slate-700 shadow-2xl rounded-xl`
              )}
            >
              <h2
                className={cx(
                  `text-lg flex items-center justify-start gap-1 border-b-2 mb-2 px-2`,
                  css`
                    min-height: 3rem;
                  `
                )}
              >
                <FaRegComments size={24} />
                Focused Comment
              </h2>
            </aside>
          </div>
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Comment;
