import {useCallback, useState} from 'react';
import {atom} from 'recoil';

const hamburgerState = atom({
  key: 'hamburgerState',
  default: {
    opened: false,
    isTrigger: false,
  },
});

export default hamburgerState;
