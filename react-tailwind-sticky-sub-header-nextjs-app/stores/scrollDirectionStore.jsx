import {atom} from 'recoil';

const scrollDirectionState = atom({
  key: 'scroll',
  default: {
    scrollDirection: null,
  },
});

export {scrollDirectionState};
