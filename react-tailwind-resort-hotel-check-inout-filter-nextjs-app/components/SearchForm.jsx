import {css, cx} from '@emotion/css';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import searchFormState from '../stores/searchFormStore';
import AreaSelector from './AreaSelector';
import CustomDatePicker from './CustomDatePicker';

const isAllNotNull = ({formState}) => {
  return Object.keys(formState).every((keyName) => {
    return formState[keyName];
  });
};

const SearchForm = () => {
  const searchForm = useRecoilValue(searchFormState);
  useEffect(() => {
    if (!isAllNotNull({formState: searchForm})) {
      return;
    }
    console.log(`searchForm`, searchForm);
  }, [searchForm]);

  return (
    <form
      className={cx(
        'w-full flex items-center justify-center gap-2',
        css`
          @media (max-width: 600px) {
            flex-direction: column;
          }
        `
      )}
    >
      <AreaSelector />
      <CustomDatePicker />
    </form>
  );
};

export default SearchForm;
