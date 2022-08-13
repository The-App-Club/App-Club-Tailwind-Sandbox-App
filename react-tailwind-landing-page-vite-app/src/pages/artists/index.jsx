import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import artist1 from '../../assets/artist1.png';
import artist2 from '../../assets/artist2.png';
import artist3 from '../../assets/artist3.png';
import {useMemo, useState} from 'react';
import {Description} from '../../components/Description';
import {useNavOpenState} from '../../hooks/useNavOpenState';
import {useEffect} from 'react';

const ArtistsPage = ({pageName, notifier}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [tik, setTik] = useState(true);
  const {opened, setNavOpened} = useNavOpenState((state) => {
    return {
      opened: state.opened,
      setNavOpened: state.setNavOpened,
    };
  });

  const data = useMemo(() => {
    return [
      {
        title: `Artist1`,
        imageURL: artist1,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      },
      {
        title: `Artist2`,
        imageURL: artist2,
        description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
      },
      {
        title: `Artist3`,
        imageURL: artist3,
        description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. `,
      },
    ];
  }, [artist1, artist2, artist3]);

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative p-2`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl pb-2">ArtistsPage</h2>

          <p
            className={cx(
              css`
                max-width: 30rem;
                width: 100%;
              `,
              `text-lg pb-2`
            )}
          >
            We have already partnered with the following artists who share our
            vision.
          </p>

          <div
            className={css`
              max-width: 30rem;
              width: 100%;
            `}
          >
            <Splide
              aria-label="Artists gallery"
              onMove={(e) => {
                setTik(false);
                // console.log(`move`);
              }}
              onMoved={(e) => {
                setTik(true);
                // console.log(`moved`);
              }}
              onVisible={(e) => {
                // console.log(`visible`);
                setActiveSlideIndex(e.index);
              }}
              className={css`
                width: 100%;
                height: 100%;
              `}
              options={{
                rewind: true,
                perPage: 1,
                arrows: !opened,
                pagination: !opened,
              }}
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
                        min-height: 18rem;
                        @media (max-width: 768px) {
                          min-height: 14rem;
                        }
                      `,
                      `bg-slate-50`
                    )}
                  >
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className={'w-60'}
                    />
                  </SplideSlide>
                );
              })}
            </Splide>
            <Description tik={tik} text={data[activeSlideIndex].description} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {ArtistsPage};
