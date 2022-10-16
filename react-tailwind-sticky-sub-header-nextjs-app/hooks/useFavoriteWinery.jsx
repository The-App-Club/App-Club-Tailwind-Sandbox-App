import {useMemo} from 'react';
import {useRecoilState} from 'recoil';

import favoriteWineryState from '@/stores/favoriteWineryStore';

const useFavoriteWinery = () => {
  const [favorite, setFavorite] = useRecoilState(favoriteWineryState);

  const toggleFavorite = ({focusedItem}) => {
    setFavorite((prevState) => {
      const isFaved = [...prevState.favoriteWineries].some((favItem) => {
        return favItem.wineryId === focusedItem.wineryId;
      });
      if (!isFaved) {
        return {
          favoriteWineries: [...prevState.favoriteWineries].concat({
            ...focusedItem,
            favorited: true,
          }),
        };
      } else {
        return {
          favoriteWineries: [...prevState.favoriteWineries].filter(
            (favItem) => {
              return favItem.wineryId !== focusedItem.wineryId;
            }
          ),
        };
      }
    });
  };

  const removeAllFromFav = () => {
    setFavorite((prevState) => {
      return {
        favoriteWineries: [],
      };
    });
  };

  const isFavorited = ({focusedItem}) => {
    if (favorite.favoriteWineries.length === 0) {
      return false;
    }
    return favorite.favoriteWineries.some((favItem) => {
      return favItem.wineryId === focusedItem.wineryId;
    });
  };

  const favoriteWineries = useMemo(() => {
    return favorite.favoriteWineries;
  }, [favorite]);

  return {
    favorite,
    favoriteWineries,
    isFavorited,
    removeAllFromFav,
    toggleFavorite,
  };
};

export default useFavoriteWinery;
