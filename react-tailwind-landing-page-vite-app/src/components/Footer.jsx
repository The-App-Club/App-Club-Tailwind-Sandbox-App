import {css, cx} from '@emotion/css';
import {Link} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';
import {BsMusicPlayer} from 'react-icons/bs';
import {BsQuestionCircle} from 'react-icons/bs';
import {IoMdBusiness} from 'react-icons/io';
import {GiHumanTarget} from 'react-icons/gi';
import {MdOutlineFeaturedPlayList} from 'react-icons/md';
import {AiOutlineMail} from 'react-icons/ai';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {AiOutlinePayCircle} from 'react-icons/ai';

import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer
      className={cx(
        css``,
        `text-xl flex justify-center items-center`,
        `border-t-2`,
        `p-6`
      )}
    >
      <div className={cx(css``, `max-w-7xl`)}>
        <div
          className={cx(
            css`
              @media (max-width: 768px) {
                flex-direction: column;
              }
            `,
            `flex items-start gap-4`
          )}
        >
          <div
            className={cx(
              css`
                @media (max-width: 768px) {
                  width: 100%;
                  max-width: 100%;
                  padding: 0 0.5rem;
                }
              `,
              'flex items-start flex-col max-w-xs gap-1'
            )}
          >
            <div className="flex items-center gap-1">
              <img src={logo} className={`w-10`} />
              <h3>Malibu Nights Lion</h3>
            </div>
            <p className="text-sm">
              We provide music streaming app creation services for artists.
            </p>
          </div>
          <div
            className={cx(
              css`
                @media (max-width: 768px) {
                  padding: 0 0.5rem;
                }
              `
            )}
          >
            <h4 className="text-lg pb-4">Menu</h4>
            <div className="flex justify-center items-start gap-16">
              <div className="flex items-start flex-col gap-3">
                <Link
                  to={'/'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <AiOutlineHome size={24} />
                  <span>Top</span>
                </Link>
                <Link
                  to={'/service'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <BsMusicPlayer size={24} />
                  <span>Service</span>
                </Link>
                <Link
                  to={'/pricing'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <AiOutlinePayCircle size={24} />
                  <span>Pricing</span>
                </Link>
                <Link
                  to={'/question'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <BsQuestionCircle size={24} />
                  <span>Q&A</span>
                </Link>
              </div>

              <div className="flex items-start flex-col gap-3">
                <Link
                  to={'/features'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <MdOutlineFeaturedPlayList size={24} />
                  <span>Features</span>
                </Link>
                <Link
                  to={'/artists'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <GiHumanTarget size={24} />
                  <span>Artists</span>
                </Link>
                <a
                  href={'https://example.com'}
                  referrerPolicy={'no-referrer'}
                  target={'_blank'}
                  className={`text-base hover:underline flex items-center gap-1 w-full`}
                >
                  <IoMdBusiness size={24} />
                  <span>Company</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className={cx(
              css`
                @media (max-width: 768px) {
                  padding: 0 0.5rem;
                }
              `
            )}
          >
            <h4 className="text-lg pb-4">Contact</h4>
            <div
              className={cx(
                css`
                  @media (max-width: 1000px) {
                    flex-direction: column;
                    align-items: flex-start;
                  }
                `,
                `flex items-center gap-3`
              )}
            >
              <div className="flex items-center gap-1">
                <AiOutlineMail size={24} />
                <span className=" text-sm">helloworld@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineLocationMarker size={24} />
                <span className=" text-sm">1589 Mifhok Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export {Footer};
