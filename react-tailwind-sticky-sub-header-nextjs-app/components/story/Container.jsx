import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {memo, useEffect, useMemo, useState} from 'react';
import GalleryItem from '@/components/story/GalleryItem';

const Container = () => {
  const data = useMemo(() => {
    return [
      {
        storyId: 1,
        title: `Something Story Title`,
        wine: `AAA`,
        winery: `BBB`,
        imageURL: `https://via.placeholder.com/300x200`,
        createdAt: '2022/10/10 11:25:23',
        updatedAt: '2022/10/10 11:28:23',
      },
      {
        storyId: 2,
        title: `Something Story Title2`,
        wine: `AAA`,
        winery: `BBB`,
        imageURL: `https://via.placeholder.com/300x200`,
        createdAt: '2022/10/10 11:25:23',
        updatedAt: '2022/10/10 11:28:23',
      },
      {
        storyId: 3,
        title: `Something Story Title3`,
        wine: `AAA`,
        winery: `BBB`,
        imageURL: `https://via.placeholder.com/300x200`,
        createdAt: '2022/10/10 11:25:23',
        updatedAt: '2022/10/10 11:28:23',
      },
      {
        storyId: 4,
        title: `Something Story Title4`,
        wine: `AAA`,
        winery: `BBB`,
        imageURL: `https://via.placeholder.com/300x200`,
        createdAt: '2022/10/10 11:25:23',
        updatedAt: '2022/10/10 11:28:23',
      },
      {
        storyId: 5,
        title: `Something Story Title5`,
        wine: `AAA`,
        winery: `BBB`,
        imageURL: `https://via.placeholder.com/300x200`,
        createdAt: '2022/10/10 11:25:23',
        updatedAt: '2022/10/10 11:28:23',
      },
    ];
  }, []);

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
