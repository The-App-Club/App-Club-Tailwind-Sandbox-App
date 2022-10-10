import {useMemo} from 'react';
import {useRecoilState} from 'recoil';
import favoriteState from '../stores/favoriteStore';

const useFavorite = ({focusedItem}) => {
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const toggleFavorite = () => {
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

  const favorited = useMemo(() => {
    if (favorite.favoriteWines.length === 0) {
      return false;
    }
    return favorite.favoriteWines.some((favItem) => {
      return favItem.id === focusedItem.id;
    });
  }, [favorite, focusedItem]);

  return {favorite, favorited, toggleFavorite};
};

export default useFavorite;
