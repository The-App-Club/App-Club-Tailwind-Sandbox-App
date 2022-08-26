import {css, cx} from '@emotion/css';
import {MdOutlineFeed} from 'react-icons/md';
import {MdOutlineExplore} from 'react-icons/md';
import {RiDraftLine} from 'react-icons/ri';
import {MdOutlineBookmarks} from 'react-icons/md';
import {FiMoreHorizontal} from 'react-icons/fi';
import {FiTrendingUp} from 'react-icons/fi';
import {BsArrowRight} from 'react-icons/bs';

import {MdWorkOutline} from 'react-icons/md';
import {FaBlog} from 'react-icons/fa';
import {MdOutlinePermMedia} from 'react-icons/md';

import {Spacer} from './Spacer';
import {TrendingTags} from './TrendingTags';

import {SocialIcon} from 'react-social-icons';

import {
  Menu,
  ControlledMenu,
  MenuItem,
  MenuButton,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

const Sidebar = ({className = css``}) => {
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
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          min-height: 40rem;
        `,
        `border-2  p-2 rounded-lg mb-2`,
        className
      )}
    >
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
      <Spacer />
      <div className="w-full">
        <TrendingTags />
        {/* <h4 className="text-md flex items-center gap-1 pb-4 p-1">
          <span>Trending Tags</span>
          <FiTrendingUp size={24} />
        </h4>
        <ul className="flex justify-start flex-col gap-1">
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md">Javascript</span>
            <span className="rounded bg-slate-100 font-bold p-1">+128</span>
          </li>
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md">Web Development</span>
            <span className="rounded bg-slate-100 font-bold p-1">+28</span>
          </li>
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md">React</span>
            <span className="rounded bg-slate-100 font-bold p-1">+18</span>
          </li>
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md">CSS</span>
            <span className="rounded bg-slate-100 font-bold p-1">+1118</span>
          </li>
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md">HTML5</span>
            <span className="rounded bg-slate-100 font-bold p-1">+2118</span>
          </li>
          <li className="flex items-center justify-between gap-1 p-1 hover:bg-slate-50 hover:cursor-pointer">
            <span className="text-md font-bold">See all</span>
            <BsArrowRight size={24} />
          </li>
        </ul> */}
        <div className="flex items-center gap-1 pt-4">
          <SocialIcon
            className={css`
              width: 32px !important;
              height: 32px !important;
            `}
            url="https://twitter.com/napzak5"
            target={'_blank'}
            referrerPolicy={'no-referrer'}
          />
          <SocialIcon
            className={css`
              width: 32px !important;
              height: 32px !important;
            `}
            url="https://www.tiktok.com/@napzak5"
            target={'_blank'}
            referrerPolicy={'no-referrer'}
          />
          <SocialIcon
            className={css`
              width: 32px !important;
              height: 32px !important;
            `}
            url="https://www.buymeacoffee.com/higashikota"
            target={'_blank'}
            referrerPolicy={'no-referrer'}
          />
          <SocialIcon
            className={css`
              width: 32px !important;
              height: 32px !important;
            `}
            url="https://www.youtube.com/channel/UCg-qojAbSiu3cfgCpvuh80w"
            target={'_blank'}
            referrerPolicy={'no-referrer'}
          />
        </div>
      </div>
      <footer className="border-t-2 pt-4 pb-2 mt-6">
        <span className="flex justify-center items-center">{`@copyright ${new Date().getFullYear()} Make YourSelf`}</span>
      </footer>
    </aside>
  );
};

export {Sidebar};
