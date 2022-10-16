import {useMemo} from 'react';
import {useRecoilState} from 'recoil';

import favoriteStoryState from '@/stores/favoriteStoryStore';

const useFavoriteStory = () => {
  const [favorite, setFavorite] = useRecoilState(favoriteStoryState);

  const toggleFavorite = ({focusedItem}) => {
    setFavorite((prevState) => {
      const isFaved = [...prevState.favoriteStories].some((favItem) => {
        return favItem.id === focusedItem.id;
      });
      if (!isFaved) {
        return {
          favoriteStories: [...prevState.favoriteStories].concat({
            ...focusedItem,
            favorited: true,
          }),
        };
      } else {
        return {
          favoriteStories: [...prevState.favoriteStories].filter((favItem) => {
            return favItem.id !== focusedItem.id;
          }),
        };
      }
    });
  };

  const removeAllFromFav = () => {
    setFavorite((prevState) => {
      return {
        favoriteStories: [],
      };
    });
  };

  const isFavorited = ({focusedItem}) => {
    if (favorite.favoriteStories.length === 0) {
      return false;
    }
    return favorite.favoriteStories.some((favItem) => {
      return favItem.id === focusedItem.id;
    });
  };

  const favoriteStories = useMemo(() => {
    return favorite.favoriteStories;
  }, [favorite]);

  return {
    favorite,
    favoriteStories,
    isFavorited,
    removeAllFromFav,
    toggleFavorite,
  };
};

export default useFavoriteStory;
