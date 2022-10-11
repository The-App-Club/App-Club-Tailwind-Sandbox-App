import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import {useEffect, useMemo, useRef, useState} from 'react';
import favoriteState from '../stores/favoriteStore';
import ProductGalleryItem from '../components/ProductGalleryItem';
import useFavorite from '../hooks/useFavorite';
import Spacer from '../components/Spacer';

const Favorite = () => {
  const [isClient, setIsClient] = useState(false);
  const {opened} = useRecoilValue(hamburgerState);
  const {favoriteWines, removeAllFromFav} = useFavorite();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderFavContent = () => {
    if (favoriteWines.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing fav wines...</p>
          <Link href={`/wines`}>
            <a className="hover:underline">See Wines</a>
          </Link>
        </div>
      );
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

  const handleRemoveAllFromFav = (e) => {
    removeAllFromFav();
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
                gap: 1rem;
              `,
              `bg-white dark:bg-slate-700 shadow-md`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2`
              )}
            >
              Favorite
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                onClick={handleRemoveAllFromFav}
              >
                Remove All
              </button>
            </div>
          </div>
          <Spacer />
          {isClient && renderFavContent()}
        </section>
      </Layout>
    </>
  );
};

export default Favorite;
