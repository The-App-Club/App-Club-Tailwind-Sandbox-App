import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteStoryState = atom({
  key: 'favoriteStoryState',
  default: {
    favoriteStories: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteStoryState;
