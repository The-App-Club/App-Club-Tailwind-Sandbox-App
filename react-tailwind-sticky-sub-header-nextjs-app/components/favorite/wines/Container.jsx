import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import GalleryItem from '@/components/favorite/wines/GalleryItem';
import useFavoriteWineStory from '@/hooks/useFavoriteWineStory';

const Container = () => {
  const [isClient, setIsClient] = useState(false);
  const {favoriteWineStories} = useFavoriteWineStory();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderContainer = () => {
    if (favoriteWineStories.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing fav wine stories...</p>
          <Link href={`/story/wines`}>
            <a className="hover:underline">See Wine Story</a>
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
          {favoriteWineStories.map((item, index) => {
            return <GalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
