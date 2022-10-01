import {css, cx} from '@emotion/css';
import 'hamburgers/dist/hamburgers.css';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import hamburgerState from '../stores/hamburgerStore';
import themeState from '../stores/themeStore';
import {motion} from 'framer-motion';

const decideHamburgerColor = ({mode}) => {
  if (mode === `dark`) {
    return css`
      .hamburger-inner,
      .hamburger-inner::before,
      .hamburger-inner::after,
      .hamburger.is-active .hamburger-inner,
      .hamburger.is-active .hamburger-inner::before,
      .hamburger.is-active .hamburger-inner::after {
        background-color: #fff !important;
      }
    `;
  }

  return css`
    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after,
    .hamburger.is-active .hamburger-inner,
    .hamburger.is-active .hamburger-inner::before,
    .hamburger.is-active .hamburger-inner::after {
      background-color: #000 !important;
    }
  `;
};

const Hamburger = ({className}) => {
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);

  const {mode} = useRecoilValue(themeState);
  const [isClient, setIsClient] = useState(false);

  const handleClick = (e) => {
    setHamburger((prevState) => {
      return {
        opened: !prevState.opened,
        isTrigger: true,
      };
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <motion.div
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
      className={cx(css``, className)}
    >
      <div
        className={cx(
          css`
            z-index: 1;
            width: 32px;
            height: 32px;
          `,
          'relative h-full w-full'
        )}
      >
        <button
          className={cx(
            `hamburger`,
            `hamburger--elastic`,
            `${hamburger.opened ? 'is-active' : ''}`,
            css`
              padding: 0 !important;
            `
          )}
          type="button"
          aria-label="Menu"
          aria-controls="navigation"
          aria-expanded={hamburger.opened}
          onClick={handleClick}
        >
          <span
            className={cx(
              css`
                width: 32px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
              `,
              'hamburger-box',
              isClient && decideHamburgerColor({mode})
            )}
          >
            <span
              className={cx(
                css`
                  &,
                  ::before,
                  ::after {
                    width: 32px;
                  }
                  & {
                    top: 6px !important;
                  }
                `,
                'hamburger-inner'
              )}
            ></span>
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default Hamburger;
