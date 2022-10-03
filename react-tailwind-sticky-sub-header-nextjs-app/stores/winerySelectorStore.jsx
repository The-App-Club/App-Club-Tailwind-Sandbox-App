import {atom} from 'recoil';

const winerySelectorState = atom({
  key: 'winerySelectorState',
  default: {
    activeWineryName: 'Maselva',
  },
});

export default winerySelectorState;
