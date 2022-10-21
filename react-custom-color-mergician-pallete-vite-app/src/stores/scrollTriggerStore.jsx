import { atom } from 'recoil';

const scrollTriggerState = atom({
  key: 'scroll',
  default: {
    progress: 0,
  },
});

export { scrollTriggerState };
