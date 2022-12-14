import {css, cx} from '@emotion/css';
import {AdsPageLayout} from '../../layouts/adsense';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {useNavOpenState} from '../../hooks/useNavOpenState';
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

  const {opened} = useNavOpenState((state) => {
    return {
      opened: state.opened,
    };
  });

  return (
    <AdsPageLayout pageName={pageName} notifier={notifier}>
      <div className="w-full flex flex-col gap-4">
        <motion.div
          initial={{
            opacity: `${opened ? 0 : 1}`,
          }}
          animate={{
            opacity: `${opened ? 0 : 1}`,
            transition: {
              duration: 0.1,
              ease: `linear`,
              delay: `${opened ? 0 : 0.4}`,
            },
          }}
          className={cx(
            css`
              position: sticky;
              top: 3rem;
              z-index: ${opened ? 0 : 1};
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
                  className="flex items-center justify-center hover:bg-slate-100 hover:cursor-pointer"
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
                    <span className="text-base">{item.title}</span>
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
                `border-2 rounded-lg p-2`
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
