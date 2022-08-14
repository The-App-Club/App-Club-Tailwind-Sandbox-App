import {css, cx} from '@emotion/css';

const BlogStatsMiniSummary = ({type}) => {
  // console.log(`type`, type); // do swr fetch
  return (
    <div className="flex items-center justify-evenly w-full">
      <div className="flex flex-col items-center">
        <div className="text-xl">7 Days</div>
        <div className="text-3xl font-bold">112</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xl">All Time</div>
        <div className="text-3xl font-bold">3745</div>
      </div>
    </div>
  );
};

export {BlogStatsMiniSummary};
