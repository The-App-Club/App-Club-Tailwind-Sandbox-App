import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {memo, useEffect, useMemo, useState} from 'react';
import GalleryItem from '@/components/story/GalleryItem';
import {default as chance} from 'chance';
import data from '@/data/stories.json';

const Container = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderContent = () => {
    if (data.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing story yet. select wine for writting.</p>
          <Link href={`/wines`}>
            <a className="hover:underline">create new story</a>
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
          {data.map((item, index) => {
            return <GalleryItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  return <>{isClient && renderContent()}</>;
};

export default memo(Container);
