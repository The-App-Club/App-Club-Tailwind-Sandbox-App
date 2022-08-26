import {css, cx} from '@emotion/css';
import {DashboardSummary} from '../components/DashboardSummary';
import {DashboardTable} from '../components/DashboardTable';
import {default as Layout} from './default';

import {LineGraph} from '../components/LineGraph';
import {BarGraph} from '../components/BarGraph';

const DashboardPageLayout = ({pageName, notifier, children}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section className={cx(css``, `max-w-7xl mx-auto w-full p-2 pt-12`)}>
        <h2 className="text-3xl flex items-center justify-center">
          DashboardPage
        </h2>
        <DashboardSummary />
        <div
          className={cx(
            css`
              display: flex;
              align-items: center;

              @media (max-width: 850px) {
                flex-direction: column;
              }
            `,
            `gap-2 pt-2`
          )}
        >
          <div
            className={cx(
              css`
                max-width: 40rem;
                @media (max-width: 850px) {
                  max-width: 50rem;
                }
                min-height: 18rem;
              `,
              `w-full border-2 p-2 rounded-lg flex justify-center items-center flex-col`
            )}
          >
            <h2 className="text-lg font-bold pb-2">Page Views</h2>
            <BarGraph />
          </div>
          <div
            className={cx(
              css`
                max-width: 40rem;
                @media (max-width: 850px) {
                  max-width: 50rem;
                }
                min-height: 18rem;
              `,
              `w-full border-2 p-2 rounded-lg flex justify-center items-center flex-col`
            )}
          >
            <h2 className="text-lg font-bold pb-2">Page Views</h2>
            <LineGraph />
          </div>
        </div>
        <DashboardTable />
      </section>
    </Layout>
  );
};

export {DashboardPageLayout};
