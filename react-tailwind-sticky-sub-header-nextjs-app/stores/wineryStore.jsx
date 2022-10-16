import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const wineryState = atom({
  key: 'wineryState',
  default: {
    activeWinery: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default wineryState;
