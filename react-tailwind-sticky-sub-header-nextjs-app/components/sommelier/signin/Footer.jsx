import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {AiFillInstagram, AiOutlineCopyright} from 'react-icons/ai';
import {BsPinterest, BsTwitter} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();
  return (
    <motion.footer
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.7,
        ease: 'linear',
      }}
      className={cx(
        css`
          opacity: 0;
          position: absolute;
          left: 0;
          max-width: 100%;
          width: 100%;
          transition: left 0.2s ease 250ms, max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
        `,
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
    </motion.footer>
  );
};

export default Footer;
