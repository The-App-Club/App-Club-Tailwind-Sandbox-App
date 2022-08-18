import {css, cx} from '@emotion/css';
import {AdsPageLayout} from '../../layouts/adsense';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const AdsPage = ({pageName, notifier}) => {
  const navigate = useNavigate();
  const data = [
    {
      title: `React`,
    },
    {
      title: `Javascript`,
    },
    {
      title: `HTML`,
    },
    {
      title: `CSS`,
    },
    {
      title: `Framer Motion`,
    },
    {
      title: `Next.js`,
    },
    {
      title: `Mo.js`,
    },
  ];

  return (
    <AdsPageLayout pageName={pageName} notifier={notifier}>
      <div className="w-full flex flex-col gap-4">
        <motion.div
          className={cx(
            css`
              position: sticky;
              top: 3rem;
              z-index: 1;
            `,
            'bg-white w-full'
          )}
        >
          <Splide
            className={cx(
              css`
                .splide__arrow--prev {
                  left: -0rem;
                  @media (max-width: 1200px) {
                  }
                  @media (max-width: 768px) {
                  }
                }
                .splide__arrow--next {
                  right: -0rem;
                  @media (max-width: 1200px) {
                  }
                  @media (max-width: 768px) {
                  }
                }
              `
            )}
            options={{
              rewind: true,
              arrows: true,
              pagination: false,
              perPage: 4,
            }}
            aria-label="Tag"
          >
            {data.map((item, index) => {
              return (
                <SplideSlide
                  key={index}
                  className="hover:border-b-2 hover:border-blue-900 flex items-center justify-center hover:bg-gray-100 hover:cursor-pointer"
                  onClick={(e) => {
                    navigate('/tag', {
                      state: {
                        tag: item.title,
                      },
                    });
                  }}
                >
                  <div
                    className={cx(
                      css`
                        min-height: 2rem;
                      `,
                      'flex items-center justify-center'
                    )}
                  >
                    <span
                      className="text-xl"
                      className={cx(
                        css`
                          font-size: 1.25rem;
                          line-height: 1.75rem;
                          @media (max-width: 768px) {
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                          }
                        `
                      )}
                    >
                      {item.title}
                    </span>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        </motion.div>

        {[...Array(30).keys()].map((n, index) => {
          return (
            <div
              key={index}
              className={cx(
                css`
                  min-height: 20rem;
                  width: 100%;
                `,
                `border-2 rounded-lg p-2 text-2xl`
              )}
            >
              {`Item ${n}`}
            </div>
          );
        })}
      </div>
    </AdsPageLayout>
  );
};

export {AdsPage};
