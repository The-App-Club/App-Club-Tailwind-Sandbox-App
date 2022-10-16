import {atom} from 'recoil';

const tasteState = atom({
  key: 'tasteState',
  default: {
    featureValue: 0,
    direction: `center`,
  },
});

export default tasteState;
