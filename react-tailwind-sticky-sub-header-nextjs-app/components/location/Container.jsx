import {css, cx} from '@emotion/css';
import {MdOutlineLocationOn} from 'react-icons/md';

import AreaGraph from '@/components/AreaGraph';
import Map from '@/components/Map';
import Weather from '@/components/Weather';

const Container = () => {
  return (
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
  );
};

export default Container;
