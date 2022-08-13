import {css, cx} from '@emotion/css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {AiOutlineCheckCircle} from 'react-icons/ai';
const PricingYearly = () => {
  return (
    <div
      className={cx(css``, `flex justify-center items-center flex-col  pb-2`)}
    >
      <h2 className="text-3xl pb-1">Yearly Pricing</h2>
      <div
        className={cx(
          css`
            @media (max-width: 768px) {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
          `,
          `flex items-start gap-3 pt-2`
        )}
      >
        <div className="border-2 p-2">
          <h3 className="text-3xl flex justify-center items-center pt-4 pb-4 relative">
            Basic
            <span className="text-sm font-bold absolute top-0 right-0 text-red-500">
              monthly than 20%off
            </span>
          </h3>
          <div
            className={cx(
              css`
                min-height: 36rem;
                min-width: 20rem;
                width: 100%;
              `,
              `relative`
            )}
          >
            <div className="text-4xl flex justify-center items-center border-t-2 pt-2 pb-2">{`$${39}`}</div>
            <div
              className={cx(
                css``,
                `flex justify-center items-center flex-col gap-1`
              )}
            >
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <button
                className="px-6 py-2 rounded bg-blue-800 hover:bg-blue-600 text-white absolute bottom-2"
                type="button"
              >
                Try this
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 p-2">
          <h3 className="text-3xl flex justify-center items-center pt-4 pb-4 relative">
            Platinum
            <span className="text-sm font-bold absolute top-0 right-0 text-red-500">
              monthly than 50%off
            </span>
          </h3>
          <div
            className={cx(
              css`
                min-height: 36rem;
                min-width: 20rem;
                width: 100%;
              `,
              `relative`
            )}
          >
            <div className="text-4xl flex justify-center items-center border-t-2 pt-2 pb-2">{`$${79}`}</div>
            <div
              className={cx(
                css``,
                `flex justify-center items-center flex-col gap-1`
              )}
            >
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <div className="flex items-start gap-1">
                <AiOutlineCheckCircle size={32} className={'text-green-600'} />
                <p>something feature description of the service.</p>
              </div>
              <button
                className="px-6 py-2 rounded bg-blue-800 hover:bg-blue-600 text-white absolute bottom-2"
                type="button"
              >
                Try this
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {PricingYearly};
