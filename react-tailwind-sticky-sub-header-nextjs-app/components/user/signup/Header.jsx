import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <motion.header
      className={cx(
        css`
          position: fixed;
          z-index: 4;
          top: 0;
          left: 0;
          max-width: 100%;
          width: 100%;
          min-height: 3rem;
          transition: left 0.2s ease 250ms, max-width 0.2s ease 250ms;
          @media (max-width: 768px) {
            left: 0;
            max-width: 100%;
          }
        `,
        `px-2`,
        `flex items-center bg-white`,
        `dark:bg-slate-700 dark:text-white shadow-md`,
        `border-b-2`
      )}
    >
      <div className="relative w-full flex items-center gap-2">
        <picture>
          <source srcSet={`/assets/logo.png`} type={`image/png`} />
          <img src={'/assets/logo.png'} alt={'logo'} width={40} height={40} />
        </picture>
        <div className="absolute right-2 flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
            onClick={(e) => {
              router.push({
                pathname: `/sommelier/signup`,
              });
            }}
          >
            For Sommelier
          </button>
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
            onClick={(e) => {
              router.push({
                pathname: `/winery/signup`,
              });
            }}
          >
            For Winery
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
