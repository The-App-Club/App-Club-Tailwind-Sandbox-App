import {useMemo} from 'react';
import {useRecoilState} from 'recoil';
import cartState from '../stores/cartStore';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const updateCart = ({focusedItem, willPurchasedAmount}) => {
    setCart((prevState) => {
      const matchedItem = [...prevState.carts].find((cart) => {
        return cart.id === focusedItem.id;
      });
      if (matchedItem) {
        return {
          carts: [...prevState.carts].map((cart) => {
            if (cart.id === focusedItem.id) {
              return {
                ...matchedItem,
                amount: willPurchasedAmount,
              };
            } else {
              return cart;
            }
          }),
        };
      } else {
        return prevState;
      }
    });
  };

  const addCart = ({focusedItem}) => {
    if (!focusedItem) {
      return;
    }
    setCart((prevState) => {
      if ([...prevState.carts].length === 0) {
        return {
          carts: [...prevState.carts].concat({
            ...focusedItem,
            amount: 1,
          }),
        };
      }
      const isExists = [...prevState.carts].some((cart) => {
        return cart.id === focusedItem.id;
      });
      if (!isExists) {
        return {
          carts: [...prevState.carts].concat({
            ...focusedItem,
            amount: 1,
          }),
        };
      } else {
        return prevState;
      }
    });
  };

  const removeCart = ({focusedItem}) => {
    if (!focusedItem) {
      return;
    }
    setCart((prevState) => {
      const isExists = [...prevState.carts].some((cart) => {
        return cart.id === focusedItem.id;
      });
      if (isExists) {
        return {
          carts: [...prevState.carts].filter((cart) => {
            return cart.id !== focusedItem.id;
          }),
        };
      } else {
        return prevState;
      }
    });
  };

  const removeAllFromCart = () => {
    setCart((prevState) => {
      return {
        carts: [],
      };
    });
  };

  const isCarted = ({focusedItem}) => {
    if (!focusedItem) {
      return false;
    }
    return cart.carts.some((cart) => {
      return cart.id === focusedItem.id;
    });
  };

  const carts = useMemo(() => {
    return cart.carts;
  }, [cart]);

  return {carts, addCart, removeCart, removeAllFromCart, isCarted, updateCart};
};

export default useCart;
