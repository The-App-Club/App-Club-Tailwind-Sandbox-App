import {css, cx} from '@emotion/css';
import {ControlledMenu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {useRecoilValue} from 'recoil';
import themeState from '@/stores/themeStore';

const Profile = ({menuData}) => {
  const router = useRouter();
  const menuDomRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const theme = useRecoilValue(themeState);

  // https://szhsin.github.io/react-menu#classname-prop
  const menuItemClassName = ({hover}) => {
    return hover
      ? cx(
          css`
            padding: 0.375rem 0.5rem 0.375rem 0.5rem;
          `,
          `dark:text-white`,
          `bg-white dark:bg-slate-700`,
          `border-l-8 border-transparent`,
          `flex items-center gap-2`,
          `hover:border-blue-900 hover:dark:border-yellow-300 hover:cursor-pointer`,
          `hover:bg-gray-100 dark:hover:bg-slate-800`,
          `my-menuitem-hover`
        )
      : cx(
          css`
            padding: 0.375rem 0.5rem 0.375rem 0.5rem;
          `,
          `dark:text-white`,
          `bg-white dark:bg-slate-700`,
          `border-l-8 border-transparent`,
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
      <picture className={css``}>
        <source srcSet={`/assets/profile.png`} type={`image/png`} />
        <img
          src={'/assets/profile.png'}
          alt={'profile'}
          width={40}
          height={40}
          className={`rounded-full border-2`}
        />
      </picture>
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={menuDomRef}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        className={cx('control-menu')}
      >
        {menuData.map((menuItem, index) => {
          return (
            <MenuItem
              key={index}
              className={menuItemClassName}
              onClick={(e) => {
                router.push({
                  pathname: menuItem.pathname,
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

export default Profile;
