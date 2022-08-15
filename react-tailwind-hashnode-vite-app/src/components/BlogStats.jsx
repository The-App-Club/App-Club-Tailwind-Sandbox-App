import {css, cx} from '@emotion/css';
import {BlogStatsMenu} from './BlogStatsMenu';
import {BsArrowUpRight} from 'react-icons/bs';

import {useNavigate} from 'react-router-dom';

const BlogStats = ({fetchType}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          min-height: 16rem;
        `,
        `border-2  p-2 rounded-lg`
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Blog Stats</h2>
        <button
          type="button"
          className="border-2 border-gray-100 px-6 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-black flex items-center gap-1"
          onClick={(e) => {
            navigate('/dashboard', {
              state: {},
            });
          }}
        >
          <span className="text-md">Dashboard</span>
          <BsArrowUpRight size={16} />
        </button>
      </div>
      <BlogStatsMenu fetchType={fetchType} />
    </div>
  );
};

export {BlogStats};
