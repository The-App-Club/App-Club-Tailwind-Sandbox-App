import {css, cx} from '@emotion/css';
import {BsBook} from 'react-icons/bs';
import {BsBookmarkPlus} from 'react-icons/bs';
import {FiThumbsUp} from 'react-icons/fi';
import {AiTwotoneStar} from 'react-icons/ai';
import {BiComment} from 'react-icons/bi';

import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png';

const TrendingFeed = ({feedType}) => {
  return (
    <div className="max-w-xl w-full border-2 p-3 rounded-lg hover:cursor-pointer hover:bg-slate-50">
      <div className="flex items-start flex-col gap-1">
        <div className="flex items-start gap-1 relative">
          <img
            src={profile2}
            alt={'profile1'}
            className={`w-12 rounded-full hover:cursor-pointer`}
          />
          <div className="flex items-start ju flex-col gap-1">
            <h3 className="text-md font-bold pt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </h3>
            <span className="text-gray-500 text-sm font-semibold hover:cursor-pointer">
              nap5
            </span>
            <div className="flex items-center justify-start gap-3">
              <div className=" hover:cursor-pointer flex items-center text-gray-500 gap-1">
                <FiThumbsUp size={20} />
                <span className="font-semibold">18</span>
              </div>
              <div className=" hover:cursor-pointer flex items-center text-gray-500 gap-1">
                <BiComment size={20} />
                <span className="font-semibold">58</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {TrendingFeed};
