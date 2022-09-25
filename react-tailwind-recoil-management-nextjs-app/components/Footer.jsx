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

const Footer = () => {
  const router = useRouter();
  return (
    <footer
      className={cx(
        css``,
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
        <img src={`/assets/logo.png`} alt={'logo'} width={40} height={40} />
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
