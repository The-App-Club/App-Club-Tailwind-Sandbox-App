import {css, cx} from '@emotion/css';
import SearchModal from '@/components/SearchModal';
import {useState} from 'react';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = (e) => {
    setShowModal(true);
    const html = document.documentElement;
    const body = document.body;
    html.classList.add('loading');
    body.classList.add('loading');
  };

  const handleModalClose = (e) => {
    setShowModal(false);
    const html = document.documentElement;
    const body = document.body;
    html.classList.remove('loading');
    body.classList.remove('loading');
  };

  return (
    <>
      <SearchModal show={showModal} handleClose={handleModalClose} />

      <div
        className={cx(
          css`
            z-index: 3;
            position: sticky;
            top: 6rem;
            min-height: 3rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `,
          `bg-white dark:bg-slate-700 px-2`
        )}
      >
        <h2
          className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
        >
          Wines
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleModalOpen}
          >
            Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
