import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

import GalleryItem from '@/components/story/favorite/wines/[wineId]/GalleryItem';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';
import {groupBy, mutate, tidy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';

const Container = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {favoriteWineStories} = useFavoriteWineStory();

  const {wineId} = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const groupedFavoriteWineStories = useMemo(() => {
    if (favoriteWineStories.length === 0) {
      return [];
    }
    return (
      tidy(
        favoriteWineStories,
        groupBy(
          ['wineId'],
          [mutate({key: (d) => `\${d.wineId}`})],
          groupBy.entries()
        )
      ) || []
    );
  }, [favoriteWineStories]);

  const matchedItem = useMemo(() => {
    if (groupedFavoriteWineStories.length === 0) {
      return [null, []];
    }
    if (!wineId) {
      return [null, []];
    }
    return groupedFavoriteWineStories.find(([key, value]) => {
      return key === Number(wineId);
    });
  }, [groupedFavoriteWineStories, wineId]);

  const matchedStories = useMemo(() => {
    if (!matchedItem) {
      return [];
    }
    return matchedItem[1];
  }, [matchedItem]);

  const renderContainer = () => {
    if (matchedStories.length === 0) {
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
          {matchedStories.map((item, index) => {
            return <GalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
