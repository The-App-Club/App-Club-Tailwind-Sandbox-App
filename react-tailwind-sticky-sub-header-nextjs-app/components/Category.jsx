import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {count, groupBy, mutate, tidy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState} from 'recoil';

import data from '@/data/wineries.json';
import locationSelectorState from '@/stores/locationSelectorStore';
import multiLocationSelectorState from '@/stores/multiLocationSelectorStore';

const Category = ({className = css``}) => {
  const router = useRouter();
  const {id} = router.query;
  const [location, setLocation] = useRecoilState(locationSelectorState);
  const [multiLocation, setMultiLocation] = useRecoilState(
    multiLocationSelectorState
  );

  const matchedData = useMemo(() => {
    return data.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  const niceData = useMemo(() => {
    if (!matchedData) {
      return [null, null];
    }
    // "Hundred Acre", "Sine Qua Non", "Domaine de La Romanée-Conti"
    return tidy(
      matchedData.wines,
      count(['winery', 'location']),
      groupBy(
        ['winery'],
        [mutate({key: (d) => `\${d.winery}`})],
        groupBy.entries()
      )
    ).flat();
  }, [matchedData]);

  useEffect(() => {
    const [winery, wines] = niceData;
    if (!winery || !wines) {
      return;
    }
    if (wines.length === 1) {
      setLocation({
        activeLocationName: wines[0].location,
      });
    } else {
      setMultiLocation({
        activeWineryName: winery,
        activeLocationNameList: wines.map((wine) => {
          return wine.location;
        }),
      });
    }
    return () => {
      setLocation({
        activeLocationName: '',
      });
      setMultiLocation({
        activeWineryName: '',
        activeLocationNameList: [],
      });
    };
  }, [niceData, setLocation, setMultiLocation]);

  return (
    <div
      className={cx(
        css`
          width: 100%;
          position: sticky;
          top: 9rem;
          z-index: 3;
        `,
        `bg-white dark:bg-slate-700 shadow-md`,
        `dark:text-white`,
        className
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
                setLocation({
                  activeLocationName: item.location,
                });
                router.push({
                  pathname: `/wineries/${item.wineryId}`,
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
