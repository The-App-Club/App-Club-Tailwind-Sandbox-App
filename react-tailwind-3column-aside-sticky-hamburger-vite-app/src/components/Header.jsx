import {css, cx} from '@emotion/css';
import 'hamburgers/dist/hamburgers.css';
import {Hamburger} from './Hamburger';

import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';

const Header = ({open, handleClick}) => {
  return (
    <header
      className={cx(
        css`
          position: fixed;
          z-index: 1;
          top: 0;
          width: 100%;
          min-height: 3rem;
        `,
        'flex items-center relative bg-white'
      )}
    >
      <Link to={'/'} className={`flex items-center gap-2 `}>
        <img src={logo} alt={'logo'} className={`w-10`} />
        <h2 className="text-xl">Make YourSelf</h2>
      </Link>
      <Hamburger
        open={open}
        handleClick={handleClick}
        className={css`
          position: absolute;
          right: 1rem;
          z-index: 1;
        `}
      />
    </header>
  );
};

export {Header};
