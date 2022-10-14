import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import data from '../data/wines.json';
import {arrange, asc, distinct, filter, map, tidy} from '@tidyjs/tidy';
import locationSelectorState from '../stores/locationSelectorStore';
import Map from '../components/Map';
import AreaGraph from '../components/AreaGraph';
import LocationSelector from '../components/LocationSelector';
import Spacer from '../components/Spacer';
import Tracer from '../components/Tracer';
import {TbTemperature} from 'react-icons/tb';
import {WiBarometer, WiHumidity} from 'react-icons/wi';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import Weather from '../components/Weather';

import {GrMap} from 'react-icons/gr';
import {MdOutlineLocationOn} from 'react-icons/md';

const Location = () => {
  const {opened} = useRecoilValue(hamburgerState);
  const {activeLocationName} = useRecoilValue(locationSelectorState);
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
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
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
          <div
            className={cx(
              css`
                z-index: 3;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.5rem;
                @media (max-width: 768px) {
                  justify-content: flex-start;
                  align-items: flex-start;
                  flex-direction: column;
                  padding: 0.5rem;
                }
              `,
              `bg-white dark:bg-slate-700 shadow-md px-2`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2`
              )}
            >
              {`Location@${activeLocationName}`}
            </h2>
            <LocationSelector />
          </div>
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
