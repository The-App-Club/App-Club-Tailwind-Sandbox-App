import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const wineState = atom({
  key: 'wineState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default wineState;
