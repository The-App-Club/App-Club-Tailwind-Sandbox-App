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

  const activeWineryStory = useMemo(() => {
    return dataWineryStories.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  const activeStory = useMemo(() => {
    if (!activeWineryStory) {
      return [];
    }

    return activeWineryStory.stories.find((story) => {
      return story.storyId === storyId;
    });
  }, [storyId, activeWineryStory]);

  const myStory = useMemo(() => {
    if (!activeWineryStory) {
      return [];
    }

    return activeWineryStory.stories.find((story) => {
      return story.storyId === storyId && story.userId === userId;
    });
  }, [storyId, activeWineryStory, userId]);

  const myStories = useMemo(() => {
    if (!activeWineryStory) {
      return [];
    }

    return activeWineryStory.stories.filter((story) => {
      return story.userId === userId;
    });
  }, [userId, activeWineryStory]);

  const myChapters = useMemo(() => {
    if (!item) {
      return [];
    }

    return item.chapters;
  }, [item]);

  const myChapter = useMemo(() => {
    return dataWineryChapters.find((item) => {
      return item.storyId === storyId && item.userId === userId;
    });
  }, [storyId, userId]);

  const focusedMyChapter = useMemo(() => {
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
    activeWineryStory,
    myStories,
    myStory,
    activeStory,
    myChapter,
    myChapters,
    focusedMyChapter,
  };
};

export default useWineryStoryChapter;
