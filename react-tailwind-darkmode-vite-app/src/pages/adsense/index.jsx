import {css, cx} from '@emotion/css';
import {AdsPageLayout} from '../../layouts/adsense';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import {AiOutlineInfoCircle} from 'react-icons/ai';

const AdsPage = ({pageName, notifier}) => {
  const darkMode = useDarkMode();
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
            'bg-white w-full',
            `dark:bg-slate-700 dark:text-white`
          )}
        >
          <p className="text-sm flex items-center justify-center gap-1">
            <AiOutlineInfoCircle size={16} />
            drag tag item
          </p>
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
              arrows: false,
              pagination: false,
              perPage: 4,
            }}
            aria-label="Tag"
          >
            {data.map((item, index) => {
              return (
                <SplideSlide
                  key={index}
                  className={cx(css``, ` flex items-center justify-center`)}
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
                      'flex items-center justify-center p-2 rounded-lg',
                      `hover:cursor-pointer`,
                      `hover:bg-gray-100 dark:hover:bg-slate-800`
                    )}
                  >
                    <span
                      className="text-xl"
                      className={cx(
                        css`
                          font-size: 0.875rem;
                          line-height: 1.25rem;
                          @media (max-width: 768px) {
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

        {[...Array(13).keys()].map((n, index) => {
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
