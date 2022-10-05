import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {BiHome} from 'react-icons/bi';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {MdOutlineShoppingCart} from 'react-icons/md';

const TraceFooter = () => {
  const router = useRouter();
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
