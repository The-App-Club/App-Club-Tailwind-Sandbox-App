import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import GalleryItem from '@/components/story/wines/[id]/published/GalleryItem';
import {useRouter} from 'next/router';
import usePublishedStory from '@/hooks/usePublishedStory';

const Container = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeStory} = usePublishedStory({id});

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!activeStory) {
    return;
  }

  const renderContainer = () => {
    if (activeStory.stories.length === 0) {
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
          {activeStory.stories.map((item, index) => {
            return <GalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
