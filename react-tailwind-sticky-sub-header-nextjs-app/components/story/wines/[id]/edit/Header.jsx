import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';

import useWine from '@/hooks/useWine';

const Header = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});

  if (!activeWine) {
    return;
  }

  const handleSave = (e) => {
    console.log(e);
  };

  const handlePreview = (e) => {
    console.log(e);
  };

  const handlePublish = (e) => {
    console.log(e);
  };

  return (
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
          padding: 0 0.5rem;
          @media (max-width: 768px) {
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            display: none;
          }
        `,
        `bg-white dark:bg-slate-700 shadow-md px-2`
      )}
    >
      <div className="w-full flex justify-between items-center gap-4">
        <h2
          className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
        >
          {`Edit Wine Story@${activeWine.wine}`}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handlePublish}
          >
            Preview
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
