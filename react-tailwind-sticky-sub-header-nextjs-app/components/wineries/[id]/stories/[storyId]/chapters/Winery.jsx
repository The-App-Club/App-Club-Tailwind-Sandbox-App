import useWinery from '@/hooks/useWinery';
import useWineryStoryChapter from '@/hooks/useWineryStoryChapter';
import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';

const Winery = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWinery} = useWinery({id});

  if (!activeWinery) {
    return;
  }

  return (
    <div>
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <GiWineBottle size={24} />
        Focused Winery
      </h2>

      <div className={cx(`relative`, `w-full h-full p-2`)}>
        <div className="w-full flex flex-col gap-2">
          <div
            className={cx(
              css`
                min-width: 200px;
                @media (max-width: 768px) {
                  min-width: 100px;
                }
                min-height: 300px;
                position: relative;
                ::before {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  content: '';
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-image: url(${activeWinery.thumbnail});
                  background-size: contain;
                  background-position: center center;
                  background-origin: center center;
                  background-repeat: no-repeat;
                }
              `
            )}
          />
          <div className="w-full">
            <h2
              className={cx(
                'text-xl sm:text-2xl',
                `hover:cursor-pointer hover:underline`
              )}
              onClick={(e) => {
                e.stopPropagation();
                router.push({
                  pathname: `/wines/${activeWinery.id}`,
                });
              }}
            >
              {activeWinery.wineryName}
            </h2>
            <div
              className={cx(
                `text-sm font-bold flex items-center`,
                `hover:cursor-pointer hover:underline`
              )}
              onClick={(e) => {
                e.stopPropagation();
                router.push({
                  pathname: `/wineries/${activeWinery.wineryId}`,
                });
              }}
            >
              <GiGrapes
                size={24}
                className={css`
                  min-width: 24px;
                `}
              />
              <span className="break-words">{`${activeWinery.wineryName}`}</span>
            </div>
            <p>{activeWinery.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Winery);
