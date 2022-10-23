import {useCallback, useMemo} from 'react';
import {useRecoilState} from 'recoil';

import favoriteWineStoryState from '@/stores/favoriteWineStoryStore';

const useFavoriteWineStory = () => {
  const [favorite, setFavorite] = useRecoilState(favoriteWineStoryState);

  const toggleFavorite = ({focusedItem}) => {
    setFavorite((prevState) => {
      const isFaved = [...prevState.favoriteWineStories].some((favItem) => {
        return favItem.storyId === focusedItem.storyId;
      });
      if (!isFaved) {
        return {
          favoriteWineStories: [...prevState.favoriteWineStories].concat({
            ...focusedItem,
            favorited: true,
          }),
        };
      } else {
        return {
          favoriteWineStories: [...prevState.favoriteWineStories].filter(
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
        favoriteWineStories: [],
      };
    });
  };

  const isFavorited = ({focusedItem}) => {
    if (favorite.favoriteWineStories.length === 0) {
      return false;
    }
    return favorite.favoriteWineStories.some((favItem) => {
      return favItem.storyId === focusedItem.storyId;
    });
  };

  const favoriteWineStories = useMemo(() => {
    return favorite.favoriteWineStories;
  }, [favorite]);

  const getFavoriteWineStoriesById = useCallback(
    ({id}) => {
      return favorite.favoriteWineStories.filter((item) => {
        return item.wineId === Number(id);
      });
    },
    [favorite]
  );

  return {
    favorite,
    favoriteWineStories,
    getFavoriteWineStoriesById,
    isFavorited,
    removeAllFromFav,
    toggleFavorite,
  };
};

export default useFavoriteWineStory;
