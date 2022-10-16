import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteWineryState = atom({
  key: 'favoriteWineryState',
  default: {
    favoriteWineries: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteWineryState;
