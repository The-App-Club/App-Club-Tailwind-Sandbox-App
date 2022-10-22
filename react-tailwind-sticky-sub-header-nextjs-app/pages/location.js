import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {MdOutlineLocationOn} from 'react-icons/md';
import {useRecoilValue} from 'recoil';

import AreaGraph from '@/components/AreaGraph';
import Map from '@/components/Map';
import Spacer from '@/components/Spacer';
import Weather from '@/components/Weather';
import Header from '@/components/location/Header';
import Sidebar from '@/components/location/Sidebar';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const Location = () => {
  const {opened} = useRecoilValue(hamburgerState);
  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12 px-2 pb-2`,
            css`
              position: absolute;
              top: 0;
              left: 18rem;
              max-width: calc(100% - 18rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                padding: 0 0.5rem;
                ol {
                  font-size: 0.875rem /* 14px */;
                  line-height: 1.25rem /* 20px */;
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  gap: 0.5rem;
                }
              }
            `
          )}
        >
          <Breadcrumbs
            useDefaultStyle={true}
            replaceCharacterList={[{from: '.', to: ' '}]}
            containerClassName="bg-white dark:bg-slate-700"
            activeItemClassName={'text-gray-500 dark:text-slate-500'}
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Location`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <Header />
          <Spacer />
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <AreaGraph className={`max-w-full`} />
            <aside
              className={cx(
                css`
                  width: 100%;
                  position: sticky;
                  top: calc(9rem + 16px);
                  z-index: 1;
                  @media (max-width: 1000px) {
                    max-width: 100%;
                  }
                `,
                `border-2 bg-white dark:bg-slate-700 shadow-2xl rounded-xl`
              )}
            >
              <h2
                className={cx(
                  `text-lg flex items-center justify-start gap-1 border-b-2 mb-2 px-2`,
                  css`
                    min-height: 3rem;
                  `
                )}
              >
                <MdOutlineLocationOn size={24} />
                Map
              </h2>
              <Map
                defaultZoom={9}
                className={css`
                  @media (max-width: 1000px) {
                  }
                `}
              />
              <Weather />
            </aside>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Location;
