import {useMemo} from 'react';
import {useRecoilState} from 'recoil';
import favoriteState from '@/stores/favoriteStore';

const useFavorite = () => {
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const toggleFavorite = ({focusedItem}) => {
    setFavorite((prevState) => {
      const isFaved = [...prevState.favoriteWines].some((favItem) => {
        return favItem.id === focusedItem.id;
      });
      if (!isFaved) {
        return {
          favoriteWines: [...prevState.favoriteWines].concat({
            ...focusedItem,
            favorited: true,
          }),
        };
      } else {
        return {
          favoriteWines: [...prevState.favoriteWines].filter((favItem) => {
            return favItem.id !== focusedItem.id;
          }),
        };
      }
    });
  };

  const removeAllFromFav = () => {
    setFavorite((prevState) => {
      return {
        favoriteWines: [],
      };
    });
  };

  const isFavorited = ({focusedItem}) => {
    if (favorite.favoriteWines.length === 0) {
      return false;
    }
    return favorite.favoriteWines.some((favItem) => {
      return favItem.id === focusedItem.id;
    });
  };

  const favoriteWines = useMemo(() => {
    return favorite.favoriteWines;
  }, [favorite]);

  return {
    favorite,
    favoriteWines,
    isFavorited,
    removeAllFromFav,
    toggleFavorite,
  };
};

export default useFavorite;
