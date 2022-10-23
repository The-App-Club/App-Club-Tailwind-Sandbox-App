import {useCallback, useMemo} from 'react';
import {useRecoilState} from 'recoil';

import cartState from '@/stores/cartStore';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const updateCart = useCallback(
    ({focusedItem, willPurchasedAmount}) => {
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
    },
    [setCart]
  );

  const addAllCart = useCallback(
    ({favedItems}) => {
      if (favedItems.length === 0) {
        return;
      }
      setCart((prevState) => {
        if ([...prevState.carts].length === 0) {
          return {
            carts: [...prevState.carts].concat(
              ...favedItems.map((favedItem) => {
                return {
                  ...favedItem,
                  amount: 1,
                };
              })
            ),
          };
        }

        const willAddedItems = [];

        for (let index = 0; index < favedItems.length; index++) {
          const focusedItem = favedItems[index];
          const isExists = [...prevState.carts].some((cart) => {
            return cart.id === focusedItem.id;
          });
          if (!isExists) {
            willAddedItems.push({
              ...focusedItem,
              amount: 1,
            });
          }
        }

        return {
          carts: [...prevState.carts].concat(...willAddedItems),
        };
      });
    },
    [setCart]
  );

  const addCart = useCallback(
    ({focusedItem, amount = 0}) => {
      if (!focusedItem) {
        return;
      }
      setCart((prevState) => {
        if ([...prevState.carts].length === 0) {
          return {
            carts: [...prevState.carts].concat({
              ...focusedItem,
              amount: amount >= 1 ? amount : 1,
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
              amount: amount >= 1 ? amount : 1,
            }),
          };
        } else {
          return prevState;
        }
      });
    },
    [setCart]
  );

  const removeCart = useCallback(
    ({focusedItem}) => {
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
    },
    [setCart]
  );

  const removeAllFromCart = useCallback(() => {
    setCart((prevState) => {
      return {
        carts: [],
      };
    });
  }, [setCart]);

  const isCarted = useCallback(
    ({focusedItem}) => {
      if (!focusedItem) {
        return false;
      }
      return cart.carts.some((cart) => {
        return cart.id === focusedItem.id;
      });
    },
    [cart]
  );

  const carts = useMemo(() => {
    return cart.carts;
  }, [cart]);

  return {
    carts,
    addAllCart,
    addCart,
    removeCart,
    removeAllFromCart,
    isCarted,
    updateCart,
  };
};

export default useCart;
