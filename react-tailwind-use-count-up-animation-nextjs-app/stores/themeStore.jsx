import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const themeState = atom({
  key: 'themeState',
  default: {
    mode: 'light',
    checked: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export default themeState;
