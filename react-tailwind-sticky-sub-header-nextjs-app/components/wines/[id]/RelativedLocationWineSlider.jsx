import {css, cx} from '@emotion/css';
import '@splidejs/react-splide/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {filter, tidy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import {MdOutlineLocationOn} from 'react-icons/md';

import Product from '@/components/wines/[id]/Product';
import dataWines from '@/data/wines.json';
import useWine from '@/hooks/useWine';

const RelativedLocationWineSlider = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const relativedLocationData = useMemo(() => {
    if (!activeWine) {
      return [];
    }
    return tidy(
      dataWines,
      filter((d) => {
        return (
          d.location === activeWine.location && d.id !== Number(activeWine.id)
        );
      })
    );
  }, [activeWine]);

  const renderContent = () => {
    if (relativedLocationData.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing relatived location wines...</p>
        </div>
      );
    } else {
      return (
        <Splide
          options={{
            rewind: false,
            pagination: false,
            perPage: 1,
            gap: '1rem',
            padding: 0,
            // padding: `10rem`,
            breakpoints: {
              768: {
                padding: 0,
              },
            },
            height: 'auto',
          }}
          aria-label="Relatived Location Wines"
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
          {relativedLocationData.map((item, index) => {
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
                    pathname: `/wines/${item.id}`,
                  });
                }}
              >
                <Product item={item} />
              </SplideSlide>
            );
          })}
        </Splide>
      );
    }
  };

  return (
    <>
      <h2 className="text-xl flex items-center gap-1">
        <MdOutlineLocationOn size={28} />
        Relatived Location Wines
      </h2>
      {isClient && renderContent()}
    </>
  );
};

export default RelativedLocationWineSlider;
