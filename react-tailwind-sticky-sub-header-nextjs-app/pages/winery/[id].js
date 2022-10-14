import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useEffect, useMemo, useState} from 'react';
import data from '../../data/wineries.json';
import Sidebar from '@/components/winery/Sidebar';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';

import hamburgerState from '../../stores/hamburgerStore';
import Category from '../../components/Category';
import TraceFooter from '../../components/TraceFooter';
import ProductGalleryItem from '../../components/ProductGalleryItem';
import SearchModal from '../../components/SearchModal';
import {count, filter, groupBy, mutate, sliceHead, tidy} from '@tidyjs/tidy';
import multiLocationSelectorState from '@/stores/multiLocationSelectorStore';

const Winery = () => {
  const [showModal, setShowModal] = useState(false);
  const [multiLocation, setMultiLocation] = useRecoilState(
    multiLocationSelectorState
  );
  const {opened} = useRecoilValue(hamburgerState);

  const router = useRouter();
  const {id} = router.query;

  const matchedData = useMemo(() => {
    return data.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  const [winery, wines] = useMemo(() => {
    if (!matchedData) {
      return [null, null];
    }
    // "Hundred Acre", "Sine Qua Non", "Domaine de La Romanée-Conti"
    return tidy(
      matchedData.wines,
      count(['winery', 'location']),
      groupBy(
        ['winery'],
        [mutate({key: (d) => `\${d.winery}`})],
        groupBy.entries()
      ),
      filter((item) => {
        const [a, b] = item;
        return b.length !== 1;
      })
    ).flat();
  }, [matchedData]);

  useEffect(() => {
    if (!winery || !wines) {
      return;
    }
    setMultiLocation({
      activeWineryName: winery,
      activeLocationNameList: wines.map((wine) => {
        return wine.location;
      }),
    });

    return () => {
      setMultiLocation({
        activeWineryName: '',
        activeLocationNameList: [],
      });
    };
  }, [winery, wines, setMultiLocation]);

  if (!matchedData) {
    return <p>loading...</p>;
  }

  const handleModalOpen = (e) => {
    setShowModal(true);
    const html = document.documentElement;
    const body = document.body;
    html.classList.add('loading');
    body.classList.add('loading');
  };

  const handleModalClose = (e) => {
    setShowModal(false);
    const html = document.documentElement;
    const body = document.body;
    html.classList.remove('loading');
    body.classList.remove('loading');
  };

  return (
    <>
      <Sidebar />
      <SearchModal show={showModal} handleClose={handleModalClose} />
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
              if (title === id) {
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
              `bg-white dark:bg-slate-700`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2 line-clamp-1`
              )}
            >
              Winery<span>@{matchedData.wineryName}</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                onClick={handleModalOpen}
              >
                Filter
              </button>
            </div>
          </div>
          <Category
            className={css`
              position: sticky;
              top: calc(9rem);
            `}
          />
          <Spacer />
          <div
            className={css`
              width: 100%;
              display: grid;
              gap: 0.5rem;
              grid-template-columns: repeat(4, 1fr);
              @media (max-width: 1200px) {
                grid-template-columns: repeat(2, 1fr);
              }
            `}
          >
            {matchedData.wines.map((item, index) => {
              return <ProductGalleryItem key={index} item={item} />;
            })}
          </div>
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Winery;
