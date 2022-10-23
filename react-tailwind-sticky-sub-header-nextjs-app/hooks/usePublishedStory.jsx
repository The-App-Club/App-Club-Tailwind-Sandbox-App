import {useMemo} from 'react';

import dataWineStories from '@/data/wineStories.json';
import dataWines from '@/data/wines.json';

const usePublishedStory = ({id, pid}) => {
  // storyId is categoryId ex.) wineId, wineryId, somulierId, userId
  const activeWineStories = useMemo(() => {
    return dataWineStories.find((d) => {
      return d.wineId === Number(id);
    });
  }, [id]);

  const activeWine = useMemo(() => {
    if (!activeWineStories) {
      return;
    }
    return dataWines.find((d) => {
      return d.id === activeWineStories.wineId;
    });
  }, [activeWineStories]);

  const activeStory = useMemo(() => {
    if (!activeWineStories) {
      return;
    }
    if (!pid) {
      return;
    }
    return dataWineStories
      .find((d) => {
        return d.wineId === activeWineStories.wineId;
      })
      .stories.find((d) => {
        return d.storyId === pid;
      });
  }, [activeWineStories, pid]);

  return {
    activeWineStories,
    activeWine,
    activeStory,
  };
};

export default usePublishedStory;
