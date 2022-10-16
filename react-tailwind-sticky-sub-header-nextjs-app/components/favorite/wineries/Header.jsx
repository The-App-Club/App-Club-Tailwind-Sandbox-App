import {css, cx} from '@emotion/css';
import {memo, useState} from 'react';

import useCart from '@/hooks/useCart';
import useFavoriteWine from '@/hooks/useFavoriteWine';
import SearchModal from '@/components/SearchModal';
import useFavoriteWinery from '@/hooks/useFavoriteWinery';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const {removeAllFromFav} = useFavoriteWinery();

  const handleRemoveAllFromFav = (e) => {
    removeAllFromFav();
  };

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
            gap: 1rem;
          `,
          `bg-white dark:bg-slate-700 shadow-md`
        )}
      >
        <h2
          className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
        >
          Favorite Winery
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleModalOpen}
          >
            Filter
          </button>
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleRemoveAllFromFav}
          >
            Remove All
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
