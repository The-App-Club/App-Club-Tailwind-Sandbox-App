import {useCallback, useState} from 'react';
import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const sidebarState = atom({
  key: 'sidebarState',
  default: {
    activeMenuName: 'Home',
  },
  effects_UNSTABLE: [persistAtom],
});

export default sidebarState;
