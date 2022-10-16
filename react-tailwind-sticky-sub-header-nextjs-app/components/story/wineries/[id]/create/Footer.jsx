import useCart from '@/hooks/useCart';
import {useCallback, useEffect, useState} from 'react';

const Footer = ({item}) => {
  return null;
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
      addCart({focusedItem: item});
    },
    [item] // eslint-disable-line
  );

  const handleRemoveCart = useCallback(
    (e) => {
      e.stopPropagation();
      removeCart({focusedItem: item});
    },
    [item] // eslint-disable-line
  );

  if (!item) {
    return;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full gap-2">
      <p className="text-2xl">Let&apos;s Now Buy!</p>
      {isClient && (
        <div className="flex items-center justify-end gap-2">
          {isCarted({focusedItem: item}) ? (
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
