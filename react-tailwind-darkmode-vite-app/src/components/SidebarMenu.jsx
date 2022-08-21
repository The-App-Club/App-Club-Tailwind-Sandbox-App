import {css, cx} from '@emotion/css';
import {Scrollbars} from 'rc-scrollbars';

import {FiTwitter} from 'react-icons/fi';
import {MdOutlineNotifications} from 'react-icons/md';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineChat} from 'react-icons/md';
import {BiTimeFive} from 'react-icons/bi';

import {
  Menu,
  ControlledMenu,
  MenuItem,
  MenuButton,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

const SidebarMenuItem = ({path, menuTitle, icon}) => {
  const navigate = useNavigate();
  const darkMode = useDarkMode();
  return (
    <li
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `flex items-center gap-2 p-2 hover:cursor-pointer`,
        `border-l-2 border-transparent ${
          darkMode.value ? '' : 'hover:border-blue-900'
        }`,
        `hover:bg-gray-100 dark:hover:bg-slate-800`
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
  const darkMode = useDarkMode();

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
          return <BiTimeFive size={24} />;
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
          `flex items-center gap-2 p-2 hover:cursor-pointer`,
          `my-menuitem-hover`
        )
      : cx(
          css`
            padding: 0.375rem 0.5rem 0.375rem 0.5rem;
          `,
          `flex items-center gap-2 p-2 hover:cursor-pointer`
        );
  };

  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
        `,
        `border-2`,
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
            `flex items-center gap-2 p-2 hover:cursor-pointer`,
            `border-l-2 border-transparent ${
              darkMode.value ? '' : 'hover:border-blue-900'
            }`,
            `hover:bg-gray-100 dark:hover:bg-slate-800`
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
              `bebop-custom-menu`,
              css`
                .my-menuitem-hover {
                  background-color: ${darkMode.value
                    ? 'rgb(30 41 59 / var(--tw-bg-opacity))'
                    : 'rgb(243 244 246 / var(--tw-bg-opacity))'};
                }
              `
            )}
          >
            {menuData.map((menuItem, index) => {
              return (
                <Link
                  key={index}
                  to={menuItem.pathname}
                  className={cx(
                    css`
                      text-decoration: none;
                      color: initial;
                    `
                  )}
                >
                  <MenuItem className={menuItemClassName}>
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
