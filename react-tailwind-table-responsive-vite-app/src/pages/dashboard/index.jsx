import {css, cx} from '@emotion/css';
import {DashboardTable} from '../../components/DashboardTable';
import {default as Layout} from '../../layouts/default';

const DashboardPage = ({pageName, notifier}) => {
  return (
    <Layout pageName={pageName} notifier={notifier}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative flex flex-col items-center`,
          css`
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">
          DashboardPage
        </h2>
        <DashboardTable />
      </section>
    </Layout>
  );
};

export {DashboardPage};
