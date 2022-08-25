import {cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {SidebarMenu} from './SidebarMenu';

import {FaHatCowboySide} from 'react-icons/fa';
import {RiAccountCircleLine} from 'react-icons/ri';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {MdOutlineLocalPolice} from 'react-icons/md';
import {GiChestnutLeaf} from 'react-icons/gi';
import {RiBarChartFill} from 'react-icons/ri';
import {BiTimeFive} from 'react-icons/bi';
import {RiNewspaperLine} from 'react-icons/ri';
import {MdSettings} from 'react-icons/md';
import {MdOutlineLogout} from 'react-icons/md';

const Nav = ({opened}) => {
  return (
    <nav className={cx(`relative w-full h-full border-r-2 border-gray-50`)}>
      <ul
        className={cx(
          `relative w-full flex justify-center items-center flex-col`
        )}
      >
        <SidebarMenu
          opened={opened}
          path={'/'}
          menuTitle={'Home'}
          icon={() => {
            return <FaHatCowboySide size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/membership'}
          menuTitle={'MemberShip'}
          icon={() => {
            return <RiAccountCircleLine size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/qa'}
          menuTitle={'QA'}
          icon={() => {
            return <AiOutlineQuestionCircle size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/policy'}
          menuTitle={'Policy'}
          icon={() => {
            return <MdOutlineLocalPolice size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/allergen'}
          menuTitle={'Allergen'}
          icon={() => {
            return <GiChestnutLeaf size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/analytics'}
          menuTitle={'Analytics'}
          icon={() => {
            return <RiBarChartFill size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/moment'}
          menuTitle={'Moments'}
          icon={() => {
            return <BiTimeFive size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/newsletters'}
          menuTitle={'Newsletters'}
          icon={() => {
            return <RiNewspaperLine size={32} />;
          }}
        />
        <SidebarMenu
          opened={opened}
          path={'/settings'}
          menuTitle={'Settings'}
          icon={() => {
            return <MdSettings size={32} />;
          }}
        />
      </ul>
    </nav>
  );
};

export {Nav};
