import {atom} from 'recoil';

const wineState = atom({
  key: 'wineState',
  default: {
    activeWine: null,
  },
});

export default wineState;
