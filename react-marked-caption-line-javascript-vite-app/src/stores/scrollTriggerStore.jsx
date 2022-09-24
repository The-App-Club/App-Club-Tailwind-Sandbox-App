import { atom } from 'recoil';

const scrollTriggerState = atom({
  key: 'scroll',
  default: {
    progress: 0,
    action: 'initial',
  },
});

export { scrollTriggerState };
