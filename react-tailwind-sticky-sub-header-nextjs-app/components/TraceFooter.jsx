import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {BiHome} from 'react-icons/bi';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {MdOutlineShoppingCart} from 'react-icons/md';
import {MdOutlineLocationOn} from 'react-icons/md';
import wineState from '../stores/wineStore';
import {useRecoilValue} from 'recoil';
const TraceFooter = () => {
  const {activeWine} = useRecoilValue(wineState);
  const router = useRouter();
  if (activeWine) {
    return (
      <aside
        className={cx(
          css`
            z-index: 3;
            position: sticky;
            bottom: 0;
            min-height: 5rem;
            width: 100%;
            display: none;
            @media (max-width: 768px) {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              flex-direction: column;
            }
          `,
          `bg-white dark:bg-slate-700 border-2`
        )}
      >
        <div className="relative w-full p-2">
          <h3 className="text-sm font-bold">{activeWine.wine}</h3>
          <div className="text-sm font-bold flex items-center gap-1">
            <GiGrapes size={16} />
            {`${activeWine.winery}`}
          </div>
          <div className="text-sm font-bold flex items-center gap-1">
            <MdOutlineLocationOn size={16} />
            {`${activeWine.location}`}
          </div>
          <button className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center absolute bottom-2 right-2">
            Add Cart
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cx(
        css`
          z-index: 3;
          position: sticky;
          bottom: 0;
          min-height: 5rem;
          width: 100%;
          display: none;
          @media (max-width: 768px) {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          }
        `,
        `bg-white dark:bg-slate-700 border-2`
      )}
    >
      <div
        className="w-full flex items-center justify-center flex-col"
        onClick={(e) => {
          router.push({
            pathname: '/',
          });
        }}
      >
        <BiHome size={24} />
        <span className="font-bold text-sm">Home</span>
      </div>
      <div
        className="w-full  flex items-center justify-center flex-col"
        onClick={(e) => {
          router.push({
            pathname: '/wines',
          });
        }}
      >
        <GiWineBottle size={24} />
        <span className="font-bold text-sm">Wines</span>
      </div>
      <div
        className="w-full  flex items-center justify-center flex-col"
        onClick={(e) => {
          router.push({
            pathname: '/winery',
          });
        }}
      >
        <GiGrapes size={24} />
        <span className="font-bold text-sm">Winery</span>
      </div>
      <div
        className="w-full  flex items-center justify-center flex-col"
        onClick={(e) => {
          router.push({
            pathname: '/cart',
          });
        }}
      >
        <MdOutlineShoppingCart size={24} />
        <span className="font-bold text-sm">Cart</span>
      </div>
    </aside>
  );
};

export default TraceFooter;
