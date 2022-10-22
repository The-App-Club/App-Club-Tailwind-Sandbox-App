import {useMemo} from 'react';

import dataWineryChapters from '@/data/wineryChapters.json';
import dataWineryStories from '@/data/wineryStories.json';

const useWineryStoryChapter = ({userId, id, storyId, chapterId}) => {
  const item = useMemo(() => {
    if (!storyId) {
      return;
    }
    return dataWineryChapters.find((item) => {
      return item.storyId === storyId && item.userId === userId;
    });
  }, [storyId, userId]);

  const item2 = useMemo(() => {
    return dataWineryStories.find((item) => {
      return item.wineryId === id;
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

export default useWineryStoryChapter;
