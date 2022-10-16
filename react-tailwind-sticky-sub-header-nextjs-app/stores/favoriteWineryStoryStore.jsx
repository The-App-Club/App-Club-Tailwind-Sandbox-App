import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();
const favoriteWineryStoryState = atom({
  key: 'favoriteWineryStoryState',
  default: {
    favoriteWineryStories: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default favoriteWineryStoryState;
