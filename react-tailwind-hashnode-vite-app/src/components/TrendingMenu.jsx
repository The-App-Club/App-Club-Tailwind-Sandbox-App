import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useMemo, useState, useEffect, createRef} from 'react';
import {MdOutlineRemoveRedEye} from 'react-icons/md';
import {GrArticle} from 'react-icons/gr';
import {TbHeartHandshake} from 'react-icons/tb';
import {TrendingFeed} from './TrendingFeed';
import {useTrendingFetchType} from '../hooks/useTrendingFetchType';

const TrendingMenu = ({fetchType}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentMenuName, setCurrentMenuName] = useState(fetchType);
  const {storeFetchType} = useTrendingFetchType((state) => {
    return {
      storeFetchType: state.storeFetchType,
    };
  });

  const menuInfoList = useMemo(() => {
    return [
      {
        menuName: `week`,
        icon: () => {
          return <MdOutlineRemoveRedEye size={40} />;
        },
        component: () => {
          return <TrendingFeed feedType={'week'} />;
        },
      },
      {
        menuName: `1 month`,
        icon: () => {
          return <GrArticle size={40} />;
        },
        component: () => {
          return <TrendingFeed feedType={'1 month'} />;
        },
      },
      {
        menuName: `3 months`,
        icon: () => {
          return <TbHeartHandshake size={40} />;
        },
        component: () => {
          return <TrendingFeed feedType={'3 months'} />;
        },
      },
    ];
  }, []);

  useEffect(() => {
    storeFetchType({currentFetchType: currentMenuName});
  }, [currentMenuName]);

  const handleClick = (e, {menuInfo}) => {
    console.log(`menuInfo`, menuInfo);
  };

  return (
    <div className={`flex items-start flex-col gap-1 w-full overflow-hidden`}>
      <ul className={cx(`relative list-none flex items-center gap-3`, css``)}>
        {menuInfoList.map((menuInfo, index) => {
          return (
            <motion.li
              key={index}
              onHoverStart={(e) => {
                setActiveIndex(index);
                setCurrentMenuName(menuInfo.menuName);
              }}
              onHoverEnd={(e) => {
                // setCurrentMenuName('');
              }}
              onClick={(e) => {
                handleClick(e, {menuInfo});
                setActiveIndex(index);
                setCurrentMenuName(menuInfo.menuName);
              }}
              className={cx(
                `hover:cursor-pointer p-1 hover:bg-gray-100 text-sm`,
                `${
                  currentMenuName === menuInfo.menuName
                    ? `border-b-2 border-blue-900`
                    : `border-b-2 border-transparent`
                }`,
                `flex items-center`
              )}
            >
              {menuInfo.menuName}
            </motion.li>
          );
        })}
      </ul>
      <div className={`w-full flex items-center flex-col pt-4 gap-2`}>
        {menuInfoList[activeIndex].component()}
        {menuInfoList[activeIndex].component()}
        {menuInfoList[activeIndex].component()}
        {menuInfoList[activeIndex].component()}
        {menuInfoList[activeIndex].component()}
        {menuInfoList[activeIndex].component()}
      </div>
    </div>
  );
};

export {TrendingMenu};
