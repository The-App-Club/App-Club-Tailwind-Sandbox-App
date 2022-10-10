import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteState = atom({
  key: 'favoriteState',
  default: {
    favoriteWines: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteState;
