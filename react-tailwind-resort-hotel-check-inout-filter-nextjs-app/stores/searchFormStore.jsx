import {useCallback, useState} from 'react';
import {atom} from 'recoil';

const searchFormState = atom({
  key: 'searchFormState',
  default: {
    checkInDate: null,
    checkOutDate: null,
    selectedArea: 'ALL',
  },
});

export default searchFormState;
