import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteWineState = atom({
  key: 'favoriteWineState',
  default: {
    favoriteWines: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteWineState;
