import {css, cx} from '@emotion/css';
import {useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import {MdOutlineFeed} from 'react-icons/md';
import {MdOutlineExplore} from 'react-icons/md';
import {RiDraftLine} from 'react-icons/ri';
import {MdOutlineBookmarks} from 'react-icons/md';
import {FiMoreHorizontal} from 'react-icons/fi';
import {MdWorkOutline} from 'react-icons/md';
import {FaBlog} from 'react-icons/fa';
import {MdOutlinePermMedia} from 'react-icons/md';

import {ControlledMenu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const SidebarMenu = ({className = css``}) => {
  const menuDomRef = useRef(null);
  const [isOpen, setOpen] = useState();

  const menuData = useMemo(() => {
    return [
      {
        id: 0,
        name: `Careers`,
        pathname: `/careers`,
        icon: () => {
          return <MdWorkOutline size={24} />;
        },
      },
      {
        id: 1,
        name: `Blog`,
        pathname: `/blog`,
        icon: () => {
          return <FaBlog size={24} />;
        },
      },
      {
        id: 2,
        name: `Media`,
        pathname: `/media`,
        icon: () => {
          return <MdOutlinePermMedia size={24} />;
        },
      },
    ];
  }, []);

  const noMoreActionData = useMemo(() => {
    return [
      {
        title: `My Feed`,
        pathname: `/feed`,
        icon: () => {
          return <MdOutlineFeed size={32} />;
        },
      },
      {
        title: `Explore`,
        pathname: `/explore`,
        icon: () => {
          return <MdOutlineExplore size={32} />;
        },
      },
      {
        title: `Drafts`,
        pathname: `/drafts`,
        icon: () => {
          return <RiDraftLine size={32} />;
        },
      },
      {
        title: `Bookmarks`,
        pathname: `/bookmarks`,
        icon: () => {
          return <MdOutlineBookmarks size={32} />;
        },
      },
    ];
  }, []);

  const handleClick = (e) => {
    console.log(e);
  };

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
    <div className="w-full">
      <ul className="flex justify-start flex-col gap-1">
        {noMoreActionData.map((item, index) => {
          return (
            <li
              key={index}
              className={cx(
                css``,
                `flex items-center gap-1 p-1 `,
                `border-l-2 border-transparent`,
                `hover:border-l-2 hover:border-blue-900`,
                `hover:bg-gray-100 hover:cursor-pointer`
              )}
            >
              {item.icon()}
              <span className="text-lg">{item.title}</span>
            </li>
          );
        })}

        <li
          ref={menuDomRef}
          className={cx(
            css``,
            `flex items-center gap-1 p-1 `,
            `border-l-2 border-transparent`,
            `hover:border-l-2 hover:border-blue-900`,
            `hover:bg-gray-100 hover:cursor-pointer`
          )}
          onClick={(e) => {
            handleClick(e);
            if (!isOpen) {
              setOpen(true);
            }
          }}
        >
          <FiMoreHorizontal size={32} />
          <span className="text-lg">More</span>
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
                  className={css`
                    text-decoration: none;
                    color: initial;
                  `}
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
    </div>
  );
};

export {SidebarMenu};
