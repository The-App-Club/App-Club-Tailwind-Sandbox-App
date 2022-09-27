import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useMemo} from 'react';
import data from '../../data/wines.json';

import {motion} from 'framer-motion';
import {CountUp} from 'use-count-up';

const Wine = () => {
  const router = useRouter();
  const {id} = router.query;
  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  if (!item) {
    return;
  }

  console.log(item);

  return (
    <Layout className={`mt-12 px-2`}>
      <section
        className={cx(
          `max-w-xl mx-auto w-full`,
          css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
          `
        )}
      >
        <div className="w-full flex items-center gap-2">
          <Link href={'/wines'}>
            <a className="hover:underline">Back to wines</a>
          </Link>
        </div>
        <Spacer />
        <h2 className="text-2xl pb-2">
          <span className="mr-2">{`#${id}`}</span>
          {item.wine}
        </h2>
        <div
          className={cx(
            'w-full flex items-center justify-end gap-2 text-sm',
            css`
              @media (max-width: 768px) {
                justify-content: center;
                flex-direction: column;
              }
            `
          )}
        >
          <div className="font-bold">{`Produced by ${item.winery}`}</div>
          <div className="font-bold">{`@${item.location}`}</div>
        </div>
        <Spacer />
        <div
          className={cx(
            css`
              min-height: 14rem;
            `,
            'relative w-full overflow-hidden overflow-y-auto'
          )}
        >
          <div className="w-full flex items-start gap-2">
            <motion.picture
              initial={{
                x: -120,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -120,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
              }}
            >
              <source srcSet={item.image} type={`image/png`} />
              <motion.img
                src={item.image}
                alt={item.wine}
                width={130}
                height={'auto'}
              />
            </motion.picture>
            <div className="w-full">
              <div
                className={cx(
                  css`
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    @media (max-width: 768px) {
                      align-items: flex-start;
                      flex-direction: column;
                    }
                  `
                )}
              >
                <div className="w-full flex items-center gap-2">
                  <div className="flex flex-col w-full">
                    <span className="text-lg">Alcohol degree</span>
                    <CountUp
                      isCounting
                      end={item.quality}
                      duration={1.7}
                      easing={'easeOutCubic'}
                      formatter={(value) => {
                        return `${Math.floor(value)}%`;
                      }}
                    />
                    <div className="flex items-center w-full">
                      <motion.div
                        className={cx(`bg-slate-300 h-5 w-full relative`)}
                      >
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${item.quality}%`,
                          }}
                          exit={{
                            width: 0,
                          }}
                          transition={{
                            duration: 1.7,
                            ease: 'easeOut',
                          }}
                          className={cx(
                            css`
                              position: absolute;
                              top: 0;
                              left: 0;
                              height: 1.25rem;
                            `,
                            `bg-pink-500 dark:bg-yellow-500`
                          )}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <Spacer height="0.5rem" />
              <div
                className={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <div>
                  <span className="text-4xl text-rose-400 dark:text-amber-400">
                    {item.rating.average}
                  </span>
                </div>
                <div className="">
                  <span className="text-sm font-medium text-gray-800 dark:text-slate-300">
                    {item.rating.reviews}
                  </span>
                </div>
              </div>
              <Spacer />
              <motion.p
                initial={{
                  y: 60,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: 60,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled.
              </motion.p>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
              Add Cart
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Wine;
