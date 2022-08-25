import {css, cx} from '@emotion/css';
import {ControlledMenu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useRef, useState} from 'react';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {Link} from 'react-router-dom';
import profile from '../assets/profile.png';

const Profile = ({menuData}) => {
  const menuDomRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

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
      <img
        src={profile}
        alt={'profile'}
        className={`w-10 rounded-full border-2 border-slate-300`}
      />
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
    </div>
  );
};

export {Profile};
