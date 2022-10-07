import {atom} from 'recoil';

const featureColumnSelectorState = atom({
  key: 'featureColumnSelectorState',
  default: {
    xColumnName: `Alcohol`,
    yColumnName: `Flavanoids`,
  },
});

export default featureColumnSelectorState;
