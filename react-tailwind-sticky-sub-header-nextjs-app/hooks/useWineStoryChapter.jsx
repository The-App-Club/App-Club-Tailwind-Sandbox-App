import {useMemo} from 'react';
import dataWineChapters from '@/data/wineChapters.json';

const useWineStoryChapter = ({userId, id, storyId, chapterId}) => {
  const item = useMemo(() => {
    if (!storyId) {
      return;
    }
    return dataWineChapters.find((item) => {
      return item.storyId === storyId && item.userId === userId;
    });
  }, [storyId, userId]);

  const item2 = useMemo(() => {
    return dataWineStories.find((item) => {
      return item.wineId === Number(id);
    });
  }, [id]);

  const myStories = useMemo(() => {
    if (!item2) {
      return [];
    }

    return item2.stories.filter((story) => {
      return story.userId === userId;
    });
  }, [userId, item2]);

  const myChapters = useMemo(() => {
    if (!item) {
      return [];
    }
    return item.chapters;
  }, [item]);

  const myChapter = useMemo(() => {
    if (myChapters.length === 0) {
      return;
    }
    if (!chapterId) {
      return;
    }
    return myChapters.find((chapter) => {
      return chapter.chapterId === chapterId;
    });
  }, [myChapters, chapterId]);

  return {
    item,
    item2,
    myStories,
    myChapters,
    myChapter,
  };
};

export default useWineStoryChapter;
