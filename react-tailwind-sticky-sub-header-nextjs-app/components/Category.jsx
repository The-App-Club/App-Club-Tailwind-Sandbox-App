import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {tidy, groupBy, mutate, filter, map} from '@tidyjs/tidy';
import {useMemo} from 'react';
import {default as chance} from 'chance';
import data from '../data/wineries.json';
import {useRouter} from 'next/router';

const Category = () => {
  const router = useRouter();

  return (
    <div
      className={cx(
        css`
          width: 100%;
          position: sticky;
          top: 9rem;
          z-index: 2;
        `,
        `bg-white dark:bg-slate-700`,
        `dark:text-white`
      )}
    >
      <Splide
        options={{
          rewind: false,
          pagination: false,
          perPage: 12,
          gap: '1rem',
          breakpoints: {
            1400: {
              perPage: 10,
            },
            1300: {
              perPage: 8,
            },
            1200: {
              perPage: 6,
            },
            1000: {
              perPage: 4,
            },
            768: {
              perPage: 3,
            },
          },
          padding: 0,
          height: '6rem',
        }}
        aria-label="Category"
        className={cx(
          css`
            .splide__arrow--prev {
              left: 0;
            }
            .splide__arrow--next {
              right: 0;
            }
          `
        )}
      >
        {data.map((item, index) => {
          return (
            <SplideSlide
              key={index}
              className={cx(
                css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                `,
                `hover:cursor-pointer`,
                `hover:bg-gray-100 dark:hover:bg-slate-800`
              )}
              onClick={(e) => {
                router.push({
                  pathname: `/winery/${item.wineryId}`,
                });
              }}
            >
              <picture className={css``}>
                <source srcSet={`/assets/drink.png`} type={`image/png`} />
                <img
                  src={'/assets/drink.png'}
                  alt={'logo'}
                  width={32}
                  height={32}
                />
              </picture>
              <span className="line-clamp-1 text-sm font-bold">
                {item.wineryName}
              </span>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Category;
