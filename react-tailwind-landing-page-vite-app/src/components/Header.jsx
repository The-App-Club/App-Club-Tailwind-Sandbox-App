import {css, cx} from '@emotion/css';
import {useNavigate} from 'react-router-dom';
import {Nav} from './Nav';
import logo from '../assets/logo.png';

const Header = ({tik, outerContainerDomRef}) => {
  const navigate = useNavigate();
  return (
    <header
      className={cx(
        css`
          z-index: 2;
          background: white;
        `,
        `sticky w-full top-0`
      )}
    >
      <div className={`relative w-full`}>
        <div
          className={cx(
            css`
              z-index: 1;
            `,
            `absolute top-0 left-0 flex justify-center items-center hover:cursor-pointer`
          )}
          onClick={(e) => {
            navigate('/', {
              state: {},
            });
          }}
        >
          <img src={logo} alt={`logo`} className={'h-12'} />
          <h5>Malibu Nights Lion</h5>
        </div>
        <Nav
          tik={tik}
          isRight={true}
          outerContainerDomRef={outerContainerDomRef}
        />
      </div>
    </header>
  );
};

export {Header};
