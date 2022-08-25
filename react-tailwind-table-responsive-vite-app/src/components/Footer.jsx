import {css, cx} from '@emotion/css';
import {Link} from 'react-router-dom';

import {BsTwitter} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';
import {AiFillInstagram} from 'react-icons/ai';
import {BsPinterest} from 'react-icons/bs';
import {AiOutlineCopyright} from 'react-icons/ai';

import logo from '../assets/logo.png';

const Footer = ({className}) => {
  return (
    <footer
      className={cx(
        css``,
        `w-full bg-white`,
        `text-xl flex justify-center flex-col items-center`,
        `border-t-2 py-2`,
        className
      )}
    >
      <Link to={'/'} className={`flex items-center gap-2`}>
        <img src={logo} alt={'logo'} className={`w-10`} />
        <h2 className="text-xl">Make YourSelf</h2>
      </Link>
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

export {Footer};
