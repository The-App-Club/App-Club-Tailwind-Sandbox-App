import {css, cx} from '@emotion/css';
import {useNavigate} from 'react-router-dom';

const SidebarMenu = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 pl-2`,
        `border-r-2 border-transparent`,
        `hover:border-r-2 hover:border-blue-900 hover:bg-gray-100 hover:cursor-pointer`
      )}
      onClick={(e) => {
        navigate(path, {
          state: {},
        });
      }}
    >
      <div className="flex items-center gap-2 py-2 pr-2">
        {icon()}
        <h4>{menuTitle}</h4>
      </div>
    </li>
  );
};

export {SidebarMenu};
