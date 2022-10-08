import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const tasteState = atom({
  key: 'tasteState',
  default: {
    featureValue: 0,
    direction: `center`,
  },
});

export default tasteState;
