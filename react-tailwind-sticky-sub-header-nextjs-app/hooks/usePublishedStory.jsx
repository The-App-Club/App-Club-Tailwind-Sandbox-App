import {useMemo} from 'react';

import dataWineStories from '@/data/wineStories.json';
import dataWines from '@/data/wines.json';

const usePublishedStory = ({id, pid}) => {
  // storyId is categoryId ex.) wineId, wineryId, somulierId, userId
  const item = useMemo(() => {
    return dataWineStories.find((d) => {
      return d.wineId === Number(id);
    });
  }, [id]);

  const activeWine = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWines.find((d) => {
      return d.id === item.wineId;
    });
  }, [item]);

  const activeStory = useMemo(() => {
    if (!item) {
      return;
    }
    return dataWineStories
      .find((d) => {
        return d.wineId === item.wineId;
      })
      .stories.find((d) => {
        return d.storyId === pid;
      });
  }, [item, pid]);

  return {
    item,
    activeWine,
    activeStory,
  };
};

export default usePublishedStory;
