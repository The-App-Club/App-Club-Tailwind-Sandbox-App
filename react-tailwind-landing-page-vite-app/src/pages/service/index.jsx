import {Spacer} from '../../components/Spacer';
import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {default as BebopLottie} from '../../components/BebopLottie';
import {useCallback, useEffect, useMemo, useState} from 'react';

const ServicePage = ({pageName, notifier}) => {
  const [activeData, setActiveData] = useState(null);
  const data = useMemo(() => {
    return [
      {
        title: `No Ads`,
        description: `Various versions have evolved over the years, sometimes by accident, sometimes on purpose.`,
        startProgress: 0,
        endProgress: 0.25,
      },
      {
        title: `Premium Member`,
        description: `Contrary to popular belief, Lorem Ipsum is not simply random text.`,
        startProgress: 0.25,
        endProgress: 0.5,
      },
      {
        title: `Playlist`,
        description: `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.`,
        startProgress: 0.5,
        endProgress: 0.75,
      },
      {
        title: `Easy to use`,
        description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.`,
        startProgress: 0.75,
        endProgress: 1,
      },
    ];
  }, []);
  const watchProgress = useCallback((e) => {
    const {progress} = e;
    const activeData = data.find((item) => {
      return item.startProgress <= progress && progress <= item.endProgress;
    });
    setActiveData(activeData);
  }, []);

  useEffect(() => {}, [activeData]);

  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-2xl mx-auto w-full relative`)}>
        <div
          className={cx(
            css``,
            `pt-8 flex justify-center items-center flex-col`
          )}
        >
          <h2 className="text-3xl">ServicePage</h2>

          <div
            className={cx(
              css`
                width: 100%;
                min-height: 300vh;
              `
            )}
          >
            <BebopLottie notifier={watchProgress} isDebug={false}>
              <div
                className={css`
                  width: 20rem;
                `}
              >
                <h2 className="text-xl">
                  {activeData ? activeData.title : data[0].title}
                </h2>
                <p>
                  {activeData ? activeData.description : data[0].description}
                </p>
              </div>
            </BebopLottie>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export {ServicePage};
