import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const dryState = atom({
  key: 'dryState',
  default: {
    value: 2.5,
  },
  effects_UNSTABLE: [persistAtom],
});

export default dryState;
