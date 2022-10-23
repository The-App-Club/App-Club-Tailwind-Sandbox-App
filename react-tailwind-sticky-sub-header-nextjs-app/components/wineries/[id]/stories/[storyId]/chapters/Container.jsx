import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import GalleryItem from '@/components/wineries/[id]/stories/[storyId]/chapters/GalleryItem';
import useWineryStoryChapter from '@/hooks/useWineryStoryChapter';

const Container = () => {
  const router = useRouter();
  const userId = 'avDLMsS';
  const {id, storyId} = router.query;
  const {myChapters: chapters} = useWineryStoryChapter({userId, id, storyId});

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderContainer = () => {
    if (chapters.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing chapters...</p>
          <Link href={`/wineries/${id}/stories/${storyId}/chapters`}>
            <a className="hover:underline">See Chapters</a>
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
              grid-template-columns: repeat(1, 1fr);
            }
          `}
        >
          {chapters.map((item, index) => {
            return <GalleryItem key={index} item={item} chapterIndex={index} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContainer()}</>;
};

export default Container;
