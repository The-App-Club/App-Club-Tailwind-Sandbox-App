import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useMemo} from 'react';
import data from '../../data/wines.json';
import capitalize from 'capitalize-the-first-letter';
import Sidebar from '../../components/Sidebar';
import hamburgerState from '../../stores/hamburgerStore';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Category from '../../components/Category';
import Tracer from '../../components/Tracer';
import {arrange, desc, map, sliceHead, tidy} from '@tidyjs/tidy';
import ReviewRanking from '../../components/ReviewRanking';

const Wine = () => {
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
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 2;
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
              if (niceTitle === id) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 2;
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
              {item.wine}
              <span className="text-sm font-bold">{`Produced by ${item.winery}`}</span>
              <span className="text-sm font-bold">{`@${item.location}`}</span>
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center">
                Add Cart
              </button>
            </div>
          </div>
          {/* <Category /> */}
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 2rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <div className="w-full flex items-start gap-2">
              <picture className={css``}>
                <source srcSet={item.image} type={`image/png`} />
                <img
                  src={item.image}
                  alt={item.wine}
                  width={130}
                  height={'auto'}
                />
              </picture>
              <div className="w-full">
                <div className="flex items-center w-full justify-end gap-2">
                  <span className="text-4xl text-rose-400 dark:text-amber-400">
                    {item.rating.average}
                  </span>
                  <span className="text-md">{item.rating.reviews}</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled.
                </p>
              </div>
            </div>
            <ReviewRanking />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Wine;
