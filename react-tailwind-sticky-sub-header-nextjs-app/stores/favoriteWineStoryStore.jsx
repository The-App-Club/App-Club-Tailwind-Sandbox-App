import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteWineStoryState = atom({
  key: 'favoriteWineStoryState',
  default: {
    favoriteWineStories: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteWineStoryState;
