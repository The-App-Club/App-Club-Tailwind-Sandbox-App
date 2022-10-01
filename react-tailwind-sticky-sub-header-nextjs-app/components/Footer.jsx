import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {BsTwitter} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';
import {AiFillInstagram} from 'react-icons/ai';
import {BsPinterest} from 'react-icons/bs';
import {RiAccountCircleLine} from 'react-icons/ri';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {MdOutlineLocalPolice} from 'react-icons/md';
import {GiChestnutLeaf} from 'react-icons/gi';
import {AiOutlineCopyright} from 'react-icons/ai';
import Link from 'next/link';
import {useLayoutEffect, useMemo, useState} from 'react';

const Footer = ({pathname}) => {
  const [mouted, setMounted] = useState(false);
  const router = useRouter();
  const nicePosition = useMemo(() => {
    if (
      pathname === `/` ||
      pathname === `/contact` ||
      pathname === `/about` ||
      pathname === `/price`
    ) {
      return css`
        left: 20rem;
        max-width: calc(100% - 20rem);
      `;
    }

    return css`
      left: 0rem;
      max-width: calc(100% - 0rem);
    `;
  }, [pathname]);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer
      className={cx(
        css`
          opacity: ${mouted ? 1 : 0};
          position: absolute;
          width: 100%;
          transition: left 0.2s ease 250ms, max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
        `,
        nicePosition,
        `text-xl flex justify-center flex-col items-center`,
        `border-t-2 py-2`,
        `dark:bg-slate-700 dark:text-white`
      )}
    >
      <div
        className={`flex items-center gap-1 hover:cursor-pointer`}
        onClick={(e) => {
          router.push({
            pathname: '/',
          });
        }}
      >
        <picture className={css``}>
          <source srcSet={`/assets/logo.png`} type={`image/png`} />
          <img src={'/assets/logo.png'} alt={'logo'} width={40} height={40} />
        </picture>
        <h2 className="text-xl">Make YourSelf</h2>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <BsTwitter
            size={24}
            className={'hover:cursor-pointer hover:text-blue-400'}
          />
          <FaFacebookF
            size={24}
            className={'hover:cursor-pointer hover:text-blue-900'}
          />
          <AiFillInstagram
            size={24}
            className={'hover:cursor-pointer hover:text-pink-700'}
          />
          <BsPinterest
            size={24}
            className={'hover:cursor-pointer hover:text-red-700'}
          />
        </div>
        <div className="flex items-center">
          <AiOutlineCopyright size={16} />
          <span className="text-sm">Make YourSelf</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
