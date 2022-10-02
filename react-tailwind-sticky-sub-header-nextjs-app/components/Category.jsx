import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {tidy, groupBy, mutate, filter, map} from '@tidyjs/tidy';
import {useMemo} from 'react';

import data from '../data/wines.json';

const Category = () => {
  const groupedData = useMemo(() => {
    return tidy(
      data,
      groupBy(
        ['winery'],
        [mutate({key: (d) => `\${d.winery}`})],
        groupBy.entriesObject()
      ),
      filter((item) => {
        return item.key !== '';
      }),
      map((item) => {
        return {winery: item.key, items: item.values};
      })
    );
  }, []);

  // console.log(groupedData);

  return (
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
        `bg-white dark:bg-slate-700`,
        `dark:text-white`,
        css`
          z-index: 1;
          .splide__arrow--prev {
            left: 0;
          }
          .splide__arrow--next {
            right: 0;
          }
        `
      )}
    >
      {groupedData.map((item, index) => {
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
              `hover:bg-gray-100 dark:hover:bg-slate-800`
            )}
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
              {item.winery}
            </span>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Category;
