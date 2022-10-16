import {css, cx} from '@emotion/css';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {BiHome} from 'react-icons/bi';
import {GiGrapes, GiWineBottle} from 'react-icons/gi';
import {MdOutlineShoppingCart} from 'react-icons/md';

import useCart from '@/hooks/useCart';


const TraceFooter = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const {carts} = useCart();
  const renderCartItemCount = () => {
    if (carts.length !== 0) {
      return (
        <motion.span
          className={cx(
            'absolute -top-2 right-3 w-6 h-6 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold text-sm',
            `${carts.length === 0 ? 'opacity-0' : 'opacity-100'}`
          )}
        >
          {carts.length}
        </motion.span>
      );
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

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
            pathname: '/wineries',
          });
        }}
      >
        <GiGrapes size={24} />
        <span className="font-bold text-sm">Winery</span>
      </div>
      <div
        className="w-full relative flex items-center justify-center flex-col"
        onClick={(e) => {
          router.push({
            pathname: '/cart',
          });
        }}
      >
        <MdOutlineShoppingCart size={24} />
        <span className="font-bold text-sm">Cart</span>
        {isClient && renderCartItemCount()}
      </div>
    </aside>
  );
};

export default TraceFooter;
