import {css, cx} from '@emotion/css';
import {groupBy, mutate, tidy} from '@tidyjs/tidy';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

import GalleryItem from '@/components/story/favorite/wines/GalleryItem';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';

const Container = () => {
  const [isClient, setIsClient] = useState(false);
  const {favoriteWineStories} = useFavoriteWineStory();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const groupedFavoriteWineStories = useMemo(() => {
    if (favoriteWineStories.length === 0) {
      return [];
    }

    return tidy(
      favoriteWineStories,
      groupBy(
        ['wineId'],
        [mutate({key: (d) => `\${d.wineId}`})],
        groupBy.entries()
      )
    );
  }, [favoriteWineStories]);

  const renderContainer = () => {
    if (groupedFavoriteWineStories.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing fav stories...</p>
          <Link href={`/story`}>
            <a className="hover:underline">See Story</a>
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
          {groupedFavoriteWineStories.map(([wineId, stories], index) => {
            return (
              <GalleryItem key={index} wineId={wineId} stories={stories} />
            );
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
