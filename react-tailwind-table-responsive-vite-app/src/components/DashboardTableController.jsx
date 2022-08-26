import {css, cx} from '@emotion/css';
import {BsGrid, BsListUl} from 'react-icons/bs';
import {BsArrowUpRight} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import {SelectListBox} from './SelectListBox';

const DashboardTableController = ({
  handleNcolumns,
  handleClick,
  displayType,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          @media (max-width: 768px) {
            justify-content: center;
            flex-direction: column;
          }
        `,
        `relative w-full px-4 pt-4`
      )}
    >
      <div className={`flex items-center justify-start gap-2`}>
        <h2 className="text-xl font-bold">Events</h2>
        <button
          type="button"
          className={cx(
            css``,
            `border-2 border-gray-300 rounded-lg`,
            `px-6 py-2 bg-gray-50 hover:bg-gray-100 text-black`,
            `flex items-center gap-1`
          )}
          onClick={(e) => {
            navigate('/events', {
              state: {},
            });
          }}
        >
          <span className="text-md">Events</span>
          <BsArrowUpRight size={16} />
        </button>
      </div>
      <div
        className={cx(
          css`
            max-width: 20rem;
            @media (max-width: 1100px) {
              max-width: initial;
            }
          `,
          `flex items-center gap-2 w-full justify-end`
        )}
      >
        <SelectListBox
          notifier={handleNcolumns}
          className={css`
            @media (max-width: 1100px) {
              display: none;
            }
          `}
        />
        <div
          className={cx(
            css`
              @media (max-width: 1100px) {
                display: none;
              }
            `,
            'hover:cursor-pointer'
          )}
          onClick={handleClick}
        >
          {displayType === `grid` ? (
            <BsGrid size={32} />
          ) : (
            <BsListUl size={32} />
          )}
        </div>
      </div>
    </div>
  );
};

export {DashboardTableController};
