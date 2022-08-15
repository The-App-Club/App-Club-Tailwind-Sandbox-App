import {css, cx} from '@emotion/css';
import {MainFeeder} from '../../components/MainFeeder.';
import {FeedType} from '../../components/FeedType';

import {DashboardPageLayout} from '../../layouts/dashboard';

import {useFeedFetchType} from '../../hooks/useFeedFetchType';

const DashboardPage = ({pageName, notifier}) => {
  const {lastestFetchType} = useFeedFetchType((state) => {
    return {
      lastestFetchType: state.lastestFetchType,
    };
  });
  return (
    <DashboardPageLayout pageName={pageName} notifier={notifier}>
      <div className="w-full">
        <FeedType fetchType={lastestFetchType} />
        <MainFeeder fetchType={lastestFetchType} />
      </div>
    </DashboardPageLayout>
  );
};

export {DashboardPage};
