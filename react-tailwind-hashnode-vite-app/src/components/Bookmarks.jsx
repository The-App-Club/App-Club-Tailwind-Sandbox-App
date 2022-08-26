import {css, cx} from '@emotion/css';
import {BsArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

const Bookmarks = () => {
  const navigate = useNavigate();
  const data = [];
  // const data = [
  //   {
  //     title: ``,
  //     author: ``,
  //     description: ``,
  //     readTime: 1,
  //     icon: () => {
  //       return null;
  //     },
  //   },
  // ];
  return (
    <div
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          min-height: 8rem;
        `,
        `border-2  p-2 rounded-lg`
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Bookmarks</h2>
        <button
          type="button"
          className="border-2 border-gray-100 px-6 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-black flex items-center gap-1"
          onClick={(e) => {
            navigate('/bookmark', {
              state: {},
            });
          }}
        >
          <span className="text-md">See All</span>
          <BsArrowUpRight size={16} />
        </button>
      </div>
      {data.length === 0 ? (
        <p className="flex items-center">Nothing here yet.</p>
      ) : (
        <>
          {data.map((item) => {
            console.log(item);
          })}
        </>
      )}
    </div>
  );
};

export {Bookmarks};
