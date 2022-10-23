import {atom} from 'recoil';
import dataLocations from '@/data/locations.json';

const locationSelectorState = atom({
  key: 'locationSelectorState',
  default: {
    activeLocationName: dataLocations[0].locationName,
  },
});

export default locationSelectorState;
