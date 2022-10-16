import {useMemo} from 'react';
import {useRecoilState} from 'recoil';

import favoriteWineryStoryState from '@/stores/favoriteWineryStoryStore';

const useFavoriteWineryStory = () => {
  const [favorite, setFavorite] = useRecoilState(favoriteWineryStoryState);

  const toggleFavorite = ({focusedItem}) => {
    setFavorite((prevState) => {
      const isFaved = [...prevState.favoriteWineryStories].some((favItem) => {
        return favItem.storyId === focusedItem.storyId;
      });
      if (!isFaved) {
        return {
          favoriteWineryStories: [...prevState.favoriteWineryStories].concat({
            ...focusedItem,
            favorited: true,
          }),
        };
      } else {
        return {
          favoriteWineryStories: [...prevState.favoriteWineryStories].filter(
            (favItem) => {
              return favItem.storyId !== focusedItem.storyId;
            }
          ),
        };
      }
    });
  };

  const removeAllFromFav = () => {
    setFavorite((prevState) => {
      return {
        favoriteWineryStories: [],
      };
    });
  };

  const isFavorited = ({focusedItem}) => {
    if (favorite.favoriteWineryStories.length === 0) {
      return false;
    }
    return favorite.favoriteWineryStories.some((favItem) => {
      return favItem.storyId === focusedItem.storyId;
    });
  };

  const favoriteWineryStories = useMemo(() => {
    return favorite.favoriteWineryStories;
  }, [favorite]);

  return {
    favorite,
    favoriteWineryStories,
    isFavorited,
    removeAllFromFav,
    toggleFavorite,
  };
};

export default useFavoriteWineryStory;
