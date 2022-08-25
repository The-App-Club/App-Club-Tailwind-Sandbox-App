import {css, cx} from '@emotion/css';
import {AnimatePresence, motion, useAnimationControls} from 'framer-motion';
import {useMemo, useState, useEffect, useRef, createRef} from 'react';
import {Link} from 'react-router-dom';
import {RiHome2Line} from 'react-icons/ri';
import {FaHatCowboySide} from 'react-icons/fa';
import {MdContactMail} from 'react-icons/md';
import {MdOutlineMonetizationOn} from 'react-icons/md';
import {SiReadthedocs} from 'react-icons/si';
import {AiTwotoneApi} from 'react-icons/ai';
import {MdFace} from 'react-icons/md';

import image1 from '../assets/Multimedia-55.png';
import image2 from '../assets/Holidays-28.png';
import image3 from '../assets/Holidays-29.png';
import image4 from '../assets/Weather-03.png';
import {useClickOutside} from '../hooks/useClickOutside';

const GlobalMenu = () => {
  const globalMenuDomRef = useRef(null);
  const [info, setInfo] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);
  const controls = useAnimationControls();

  const imageData = useMemo(() => {
    return [image1, image2, image3, image4];
  }, []);

  const menuInfoList = useMemo(() => {
    return [
      {
        menuName: `developer`,
        description: `Contrary to popular belief, Lorem Ipsum is not simply random text.`,
        icon: () => {
          return <AiTwotoneApi size={24} />;
        },
        imageDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur vehicula vulputate.`,
      },
      {
        menuName: `price`,
        description: `There are many variations of passages of Lorem Ipsum available.`,
        icon: () => {
          return <MdOutlineMonetizationOn size={24} />;
        },
        imageDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur vehicula vulputate.`,
      },
      {
        menuName: `docs`,
        description: `The standard chunk of Lorem Ipsum used since the 1500s is .`,
        icon: () => {
          return <SiReadthedocs size={24} />;
        },
        imageDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur vehicula vulputate.`,
      },
    ].map((item, index) => {
      return {...item, imageURL: imageData[index]};
    });
  }, [imageData]);

  const menusDomRef = useMemo(() => {
    return [...Array(menuInfoList.length).keys()].map((n) => {
      return createRef();
    });
  }, [menuInfoList]);

  useEffect(() => {
    if (info.hovering) {
      controls.start({
        opacity: 1,
        left: info.x,
        pointerEvents: 'auto',
      });
    }
  }, [info]);

  const handleDoMore = (e, {menuInfo}) => {
    console.log('do more', menuInfo);
  };

  useClickOutside(globalMenuDomRef, (e) => {
    controls.start({
      opacity: 0,
      left: info.x,
      pointerEvents: 'none',
    });
  });

  return (
    <motion.ul
      ref={globalMenuDomRef}
      className={cx(
        css`
          @media (max-width: 768px) {
            display: none;
          }
        `,
        `relative list-none flex items-center h-full`
      )}
    >
      {menuInfoList.map((menuInfo, index) => {
        return (
          <motion.li
            key={index}
            className={cx(
              css`
                min-width: 8rem;
                min-height: 3rem;
              `,
              `flex justify-center items-center gap-2 px-2`,
              `border-b-2 border-transparent hover:cursor-pointer hover:border-blue-600`
            )}
            ref={menusDomRef[index]}
            onClick={(e) => {
              setActiveIndex(index);
              const offsetLeft =
                menusDomRef[0].current.getBoundingClientRect().left;
              const x = e.currentTarget.offsetLeft;
              setInfo({
                x,
                offsetLeft,
                hovering: true,
              });
            }}
            onHoverStart={(e) => {
              setActiveIndex(index);
              const offsetLeft =
                menusDomRef[0].current.getBoundingClientRect().left;
              const x = e.currentTarget.offsetLeft;
              setInfo({
                x,
                offsetLeft,
                hovering: true,
              });
            }}
            onHoverEnd={(e) => {
              setActiveIndex(-1);
              const offsetLeft =
                menusDomRef[0].current.getBoundingClientRect().left;
              const x = e.currentTarget.offsetLeft;
              setInfo({
                x,
                offsetLeft,
                hovering: false,
              });
            }}
          >
            <div className={cx(css``, `flex justify-center items-center`)}>
              {menuInfo.icon()}
            </div>
            <h4>{menuInfo.menuName}</h4>
            <motion.div
              className={cx(
                css`
                  overflow: hidden;
                  opacity: 0;
                  pointer-events: none;
                  position: absolute;
                  left: 0;
                  top: 3rem;
                  display: ${index === activeIndex ? 'block' : 'none'};
                `,
                `bg-white border-2 border-gray-200`
              )}
              animate={controls}
            >
              <div className={cx(css``, `w-full p-2 hover:cursor-default`)}>
                <div
                  className={cx(
                    css`
                      width: 22rem;
                      min-height: 14rem;
                    `,
                    `w-full flex justify-start items-center flex-col gap-2`
                  )}
                >
                  <div className="flex items-center gap-2">
                    {menuInfoList[activeIndex]?.icon()}
                    <h2 className="text-2xl">
                      {menuInfoList[activeIndex]?.menuName}
                    </h2>
                  </div>
                  <p>{menuInfoList[activeIndex]?.description}</p>
                  <div
                    className={`w-full flex justify-center items-center gap-2`}
                  >
                    <img
                      src={menuInfoList[activeIndex]?.imageURL}
                      alt={menuInfoList[activeIndex]?.menuName}
                      className={'w-12'}
                    />
                    <p>{menuInfoList[activeIndex]?.imageDescription}</p>
                  </div>
                  <div className={`w-full flex justify-end items-center`}>
                    <button
                      type={'button'}
                      className={cx(
                        css``,
                        `px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg`
                      )}
                      onClick={(e) => {
                        handleDoMore(e, {
                          menuInfo: menuInfoList[activeIndex],
                        });
                      }}
                    >
                      Do More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export {GlobalMenu};
