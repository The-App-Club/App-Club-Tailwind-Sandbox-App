import {css, cx} from '@emotion/css';
import {MainFeeder} from '../../components/MainFeeder.';
import {FeedType} from '../../components/FeedType';

import {HomePageLayout} from '../../layouts/home';

import {useFeedFetchType} from '../../hooks/useFeedFetchType';

const HomePage = ({pageName, notifier}) => {
  const {lastestFetchType} = useFeedFetchType((state) => {
    return {
      lastestFetchType: state.lastestFetchType,
    };
  });
  return (
    <HomePageLayout pageName={pageName} notifier={notifier}>
      <div className="w-full">
        <FeedType fetchType={lastestFetchType} />
        <MainFeeder fetchType={lastestFetchType} />
      </div>
    </HomePageLayout>
  );
};

export {HomePage};
