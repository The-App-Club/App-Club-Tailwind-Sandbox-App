import {MainFeed} from './MainFeed';

const MainFeeder = ({fetchType}) => {
  return (
    <div className="flex flex-col w-full gap-4 justify-center py-2">
      <MainFeed feedType={fetchType} />
      {/* <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} />
      <MainFeed feedType={fetchType} /> */}
    </div>
  );
};

export {MainFeeder};
