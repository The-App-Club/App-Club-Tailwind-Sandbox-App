import {atom} from 'recoil';

const winerySelectorState = atom({
  key: 'winerySelectorState',
  default: {
    activeWineryName: 'Spain\n·\nEmpordà',
  },
});

export default winerySelectorState;
