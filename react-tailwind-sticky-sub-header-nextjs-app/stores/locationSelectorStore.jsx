import {atom} from 'recoil';

const locationSelectorState = atom({
  key: 'locationSelectorState',
  default: {
    activeLocationName: 'Spain\n·\nEmpordà',
  },
});

export default locationSelectorState;
