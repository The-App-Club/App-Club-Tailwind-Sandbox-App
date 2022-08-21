import {css, cx} from '@emotion/css';
import {BsBook} from 'react-icons/bs';
import {BsBookmarkPlus} from 'react-icons/bs';
import {FiThumbsUp} from 'react-icons/fi';
import {AiTwotoneStar} from 'react-icons/ai';

import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png';

const MainFeed = ({feedType}) => {
  const handleContentClick = (e) => {
    console.log('Content Clicked');
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    console.log('User Clicked');
  };

  return (
    <div
      className="max-w-7xl w-full  border-2 p-4 rounded-lg hover:cursor-pointer hover:bg-slate-50"
      onClick={handleContentClick}
    >
      <div className="flex items-center gap-1 relative">
        <img
          src={profile1}
          alt={'profile1'}
          className={`w-16 rounded-full hover:cursor-pointer`}
        />
        <div className="flex items-start flex-col gap-1">
          <span
            className="font-bold hover:cursor-pointer"
            onClick={handleUserClick}
          >
            nap5
          </span>
          <div className="flex items-start gap-1">
            <span className="hover:cursor-pointer">example.com</span>
            <span>21 hours ago</span>
          </div>
        </div>
        {feedType && (
          <span className="absolute top-0 right-0 font-bold text-green-900 bg-green-100 rounded-md p-1 pr-3 flex items-center gap-1 text-sm">
            <AiTwotoneStar size={16} fill={'gold'} />
            {feedType}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold pt-2">Something Title</h3>
      <div className="flex items-center gap-1 pt-2">
        <BsBook size={24} />
        <span>13 min read</span>
      </div>
      <div
        className={cx(
          css`
            @media (max-width: 1200px) {
              flex-direction: column;
              align-items: flex-start;
              padding-bottom: 1rem;
            }
          `,
          'flex items-center gap-1'
        )}
      >
        <p className="pt-4 pb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <img
          src={`https://assets.st-note.com/production/uploads/images/82602779/rectangle_large_type_2_638407e9f0978651c37abda8a44a2325.png?width=800`}
          alt={''}
          className={`w-56`}
        />
      </div>
      <div className="flex items-center gap-1 relative">
        <BsBookmarkPlus size={24} className={`hover:cursor-pointer`} />
        <div className="flex items-center gap-1">
          <Tag tagName={'Javascript'} />
          <Tag tagName={'CSS'} />
          <Tag tagName={'React'} />
        </div>
        <div className="absolute bottom-1 right-1 hover:cursor-pointer flex  gap-1">
          <FiThumbsUp size={24} />
          <span className="rounded bg-slate-100 font-bold p-1">+18</span>
        </div>
      </div>
    </div>
  );
};

const Tag = ({tagName}) => {
  const handleTagClick = (e) => {
    e.stopPropagation();
    console.log('Tag Clicked');
  };

  return (
    <span
      className="border-2 p-2 rounded-lg hover:cursor-pointer"
      onClick={handleTagClick}
    >
      {tagName}
    </span>
  );
};

export {MainFeed};
