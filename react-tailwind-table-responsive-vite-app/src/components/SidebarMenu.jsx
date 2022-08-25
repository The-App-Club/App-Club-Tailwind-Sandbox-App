import {css, cx} from '@emotion/css';
import {useNavigate} from 'react-router-dom';

import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';
import {useStoreSidebarMenuPosition} from '../hooks/useStoreSidebarMenuPosition';

const SidebarMenu = ({opened, path, menuTitle, icon, notifier}) => {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);

  const {setSidebarMenuPosition} = useStoreSidebarMenuPosition((state) => {
    return {
      setSidebarMenuPosition: state.setSidebarMenuPosition,
    };
  });

  return (
    <motion.li
      onHoverStart={(e) => {
        setHovering(true);
        setSidebarMenuPosition({
          x: e.clientX,
          y: e.currentTarget.offsetTop,
          text: menuTitle,
          hovering: true,
        });
      }}
      onHoverEnd={(e) => {
        setHovering(false);
        setSidebarMenuPosition({
          x: e.clientX,
          y: e.currentTarget.offsetTop,
          text: menuTitle,
          hovering: false,
        });
      }}
      className={cx(
        css`
          width: 100%;
          min-height: 3rem;
        `,
        `relative`,
        `flex items-center gap-2 px-2`,
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
    </motion.li>
  );
};

export {SidebarMenu};
