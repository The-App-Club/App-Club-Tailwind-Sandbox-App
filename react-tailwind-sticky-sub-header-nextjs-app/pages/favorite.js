import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import {useMemo, useRef, useState} from 'react';
import favoriteState from '../stores/favoriteStore';
import ProductGalleryItem from '../components/ProductGalleryItem';
import useFavorite from '../hooks/useFavorite';

const Favorite = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const {favoriteWines} = useFavorite();
  const renderFavContent = () => {
    if (favoriteWines.length === 0) {
      return <p>Nothing fav wines...</p>;
    } else {
      return (
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
          {favoriteWines.map((item, index) => {
            return <ProductGalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

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
              if (niceTitle === `Favorite`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />

          <h2 className="text-3xl flex items-center justify-center">
            Favorite
          </h2>
          {renderFavContent()}
        </section>
      </Layout>
    </>
  );
};

export default Favorite;
