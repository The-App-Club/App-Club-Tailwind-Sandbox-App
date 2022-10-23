import {atom} from 'recoil';

import dataLocations from '@/data/locations.json';

const locationSelectorState = atom({
  key: 'locationSelectorState',
  default: {
    activeLocationId: dataLocations[0].locationId,
    activeLocationName: dataLocations[0].locationName,
  },
});

export default locationSelectorState;
