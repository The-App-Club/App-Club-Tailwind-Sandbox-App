import {atom} from 'recoil';

const scrollTriggerState = atom({
  key: 'scroll',
  default: {
    progress: 0,
    chapterId: null,
    direction: 'down',
  },
});

export {scrollTriggerState};
