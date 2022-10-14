import {atom} from 'recoil';

const multiLocationSelectorState = atom({
  key: 'multiLocationSelectorState',
  default: {
    activeWineryName: '',
    activeLocationNameList: [],
  },
});

export default multiLocationSelectorState;
