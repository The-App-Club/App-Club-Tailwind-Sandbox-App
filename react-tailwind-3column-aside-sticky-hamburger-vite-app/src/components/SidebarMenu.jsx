import {css, cx} from '@emotion/css';
import {Scrollbars} from 'rc-scrollbars';

import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineChat} from 'react-icons/md';
import {GrBeacon} from 'react-icons/gr';

import {
  Menu,
  ControlledMenu,
  MenuItem,
  MenuButton,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useMemo, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SidebarMenuItem = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();

  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        `,
        'hover:border-l-2 hover:border-blue-900 hover:bg-gray-100 hover:cursor-pointer p-2 gap-2'
      )}
      onClick={(e) => {
        navigate(path, {
          state: {},
        });
      }}
    >
      {icon()}
      <h2 className="text-lg">{menuTitle}</h2>
    </li>
  );
};

const SidebarMenu = ({className}) => {
  const navigate = useNavigate();
  const menuDomRef = useRef(null);
  const [isOpen, setOpen] = useState();

  const menuData = useMemo(() => {
    return [
      {
        id: 0,
        name: `Topics`,
        pathname: `/topic`,
        icon: () => {
          return <MdOutlineChat size={24} />;
        },
      },
      {
        id: 1,
        name: `Moments`,
        pathname: `/moment`,
        icon: () => {
          return <GrBeacon size={24} />;
        },
      },
    ];
  }, []);

  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
        `,
        `border-2 rounded-lg`,
        className
      )}
    >
      <ul
        className={cx(
          css`
            min-width: 18rem;
            width: 100%;
            height: 100%;
            min-height: 26rem;
            max-height: 30rem;
          `
        )}
      >
        <SidebarMenuItem
          path={'/'}
          menuTitle={'Home'}
          icon={() => {
            return <FiTwitter size={24} />;
          }}
        />
        <SidebarMenuItem
          path={'/notification'}
          menuTitle={'Notification'}
          icon={() => {
            return <MdOutlineNotifications size={24} />;
          }}
        />
        <li
          ref={menuDomRef}
          className={cx(
            css`
              min-height: 3rem;
              width: 100%;
            `,
            `hover:border-l-2 hover:border-blue-900 p-2 flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100`
          )}
          onClick={(e) => {
            if (!isOpen) {
              setOpen(true);
            }
          }}
        >
          <BiDotsHorizontalRounded size={24} />
          <h2 className="text-lg">{`More`}</h2>
          <ControlledMenu
            state={isOpen ? 'open' : 'closed'}
            anchorRef={menuDomRef}
            onMouseLeave={() => {
              setOpen(false);
            }}
            onClose={() => {
              setOpen(false);
            }}
            className={cx(
              css`
                display: ${menuData.length > 0 ? 'block' : 'none'};
              `,
              ``
            )}
          >
            {menuData.map((menuItem, index) => {
              return (
                <Link
                  key={index}
                  to={menuItem.pathname}
                  className={cx(css`
                    text-decoration: none;
                    color: initial;
                  `)}
                >
                  <MenuItem
                    className={cx(
                      css`
                        padding: 0.375rem 0.5rem 0.375rem 0.5rem;
                      `,
                      'hover:cursor-pointer hover:bg-gray-100'
                    )}
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
                </Link>
              );
            })}
          </ControlledMenu>
        </li>
      </ul>
    </aside>
  );
};

export {SidebarMenu};
