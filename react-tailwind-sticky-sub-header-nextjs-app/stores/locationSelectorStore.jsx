import {atom} from 'recoil';

const locationSelectorState = atom({
  key: 'locationSelectorState',
  default: {
    activeWineryName: 'Spain\n·\nEmpordà',
  },
});

export default locationSelectorState;
