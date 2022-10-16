import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

import GalleryItem from '@/components/story/favorite/wineries/GalleryItem';
import {groupBy, mutate, tidy} from '@tidyjs/tidy';
import useFavoriteWineryStory from '@/hooks/useFavoriteWineryStory';

const Container = () => {
  const [isClient, setIsClient] = useState(false);
  const {favoriteWineryStories} = useFavoriteWineryStory();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const groupedFavoriteWineryStories = useMemo(() => {
    if (favoriteWineryStories.length === 0) {
      return [];
    }

    return tidy(
      favoriteWineryStories,
      groupBy(
        ['wineryId'],
        [mutate({key: (d) => `\${d.wineryId}`})],
        groupBy.entries()
      )
    );
  }, [favoriteWineryStories]);

  const renderContainer = () => {
    if (groupedFavoriteWineryStories.length === 0) {
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
          {groupedFavoriteWineryStories.map(([wineryId, stories], index) => {
            return (
              <GalleryItem key={index} wineryId={wineryId} stories={stories} />
            );
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
