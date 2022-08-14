import {MainFeed} from './MainFeed';

const MainFeeder = ({fetchType}) => {
  return (
    <div className="flex flex-col gap-1 justify-center pt-2 pb-2">
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
    </div>
  );
};

export {MainFeeder};
