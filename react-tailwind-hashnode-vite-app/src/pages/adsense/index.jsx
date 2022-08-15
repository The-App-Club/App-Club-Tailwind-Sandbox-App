import {css, cx} from '@emotion/css';
import {MainFeeder} from '../../components/MainFeeder.';
import {FeedType} from '../../components/FeedType';

import {AdsPageLayout} from '../../layouts/adsense';

import {useFeedFetchType} from '../../hooks/useFeedFetchType';

const AdsPage = ({pageName, notifier}) => {
  const {lastestFetchType} = useFeedFetchType((state) => {
    return {
      lastestFetchType: state.lastestFetchType,
    };
  });
  return (
    <AdsPageLayout pageName={pageName} notifier={notifier}>
      <div className="w-full">
        <FeedType fetchType={lastestFetchType} />
        <MainFeeder fetchType={lastestFetchType} />
      </div>
    </AdsPageLayout>
  );
};

export {AdsPage};
