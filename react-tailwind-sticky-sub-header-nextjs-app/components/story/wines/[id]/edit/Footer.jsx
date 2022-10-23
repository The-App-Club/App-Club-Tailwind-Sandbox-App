import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';

import useCart from '@/hooks/useCart';
import useWine from '@/hooks/useWine';

const Footer = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWine} = useWine({id});
  const {addCart, removeCart, isCarted} = useCart();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const handleAddCart = useCallback(
    (e) => {
      e.stopPropagation();
      addCart({focusedItem: activeWine});
    },
    [activeWine, addCart]
  );

  const handleRemoveCart = useCallback(
    (e) => {
      e.stopPropagation();
      removeCart({focusedItem: activeWine});
    },
    [activeWine, removeCart]
  );

  if (!activeWine) {
    return;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-2">
      <p className="text-2xl">Let&apos;s Now Buy!</p>
      {isClient && (
        <div className="flex items-center justify-end gap-2">
          {isCarted({focusedItem: activeWine}) ? (
            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
              onClick={handleRemoveCart}
            >
              Remove Cart
            </button>
          ) : (
            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
              onClick={handleAddCart}
            >
              Add Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Footer;
