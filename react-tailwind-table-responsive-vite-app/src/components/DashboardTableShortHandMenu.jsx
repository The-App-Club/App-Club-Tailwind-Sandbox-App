import {css, cx} from '@emotion/css';
import {ControlledMenu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useMemo} from 'react';
import {useRef, useState} from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';
import {RiBarChartFill} from 'react-icons/ri';
import {BiTimeFive} from 'react-icons/bi';
import {RiNewspaperLine} from 'react-icons/ri';
import {Link, useNavigate} from 'react-router-dom';

const DashboardTableShortHandMenu = ({item}) => {
  const navigate = useNavigate();
  const menuDomRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const menuData = useMemo(() => {
    return [
      {
        id: 0,
        name: `Analytics`,
        pathname: `/analytics`,
        icon: () => {
          return <RiBarChartFill size={24} />;
        },
      },
      {
        id: 1,
        name: `Moments`,
        pathname: `/moment`,
        icon: () => {
          return <BiTimeFive size={24} />;
        },
      },
      {
        id: 2,
        name: `Newsletters`,
        pathname: `/newsletters`,
        icon: () => {
          return <RiNewspaperLine size={24} />;
        },
      },
    ];
  }, []);

  // https://szhsin.github.io/react-menu#classname-prop
  const menuItemClassName = ({hover}) => {
    return hover
      ? cx(
          css`
            padding: 0.375rem 0.5rem 0.375rem 0.5rem;
          `,
          `border-l-2 border-transparent`,
          `hover:border-blue-900 hover:bg-gray-100 hover:cursor-pointer`,
          `flex items-center gap-2`,
          `my-menuitem-hover`
        )
      : cx(
          css`
            padding: 0.375rem 0.5rem 0.375rem 0.5rem;
          `,
          `border-l-2 border-transparent`,
          `flex items-center gap-2`
        );
  };
  return (
    <div
      ref={menuDomRef}
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          cursor: pointer;
        }
      `}
      onClick={(e) => {
        if (!isOpen) {
          setOpen(true);
        }
      }}
    >
      <FiMoreHorizontal size={32} />
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={menuDomRef}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        className={cx(css``)}
      >
        {menuData.map((menuItem, index) => {
          return (
            <MenuItem
              key={index}
              className={menuItemClassName}
              onClick={(e) => {
                const {Event, Date, Location, Qty, Price} = item;
                navigate(menuItem.pathname, {
                  state: {Event, Date, Location, Qty, Price},
                });
              }}
            >
              {menuItem.icon()}
              <span
                className={css`
                  padding-left: 0.5rem;
                `}
              >
                {menuItem.name}
              </span>
            </MenuItem>
          );
        })}
      </ControlledMenu>
    </div>
  );
};

export {DashboardTableShortHandMenu};
