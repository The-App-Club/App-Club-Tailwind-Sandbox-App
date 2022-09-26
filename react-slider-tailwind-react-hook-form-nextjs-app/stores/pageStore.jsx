import {atom} from 'recoil';

const pageState = atom({
  key: 'pageState',
  default: {
    pageName: 'SignIn',
  },
});

export default pageState;
