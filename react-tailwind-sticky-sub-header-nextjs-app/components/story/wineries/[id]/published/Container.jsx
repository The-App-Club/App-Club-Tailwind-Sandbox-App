import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import GalleryItem from '@/components/story/wineries/[id]/published/GalleryItem';
import useWineryStoryChapter from '@/hooks/useWineryStoryChapter';

const Container = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWineryStory} = useWineryStoryChapter({id});

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!activeWineryStory) {
    return;
  }

  const renderContainer = () => {
    if (activeWineryStory.stories.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing stories...</p>
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
          {activeWineryStory.stories.map((item, index) => {
            return <GalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
