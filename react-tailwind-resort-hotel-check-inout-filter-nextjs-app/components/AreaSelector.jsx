import {cx} from '@emotion/css';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import searchFormState from '../stores/searchFormStore';

const AreaSelector = () => {
  const [searchForm, setSearchForm] = useRecoilState(searchFormState);

  return (
    <div className="w-80">
      <label
        htmlFor="area"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        エリア
      </label>
      <select
        id="area"
        className={cx(
          `block w-full px-3 py-2`,
          `text-gray-900 dark:text-white text-sm font-medium`,
          `shadow-sm border rounded-lg border-gray-300 dark:border-gray-600`,
          `focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 focus:border-blue-500`,
          `bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400`
        )}
        value={searchForm.selectedArea}
        onChange={(e) => {
          setSearchForm((prevState) => {
            return {
              checkInDate: prevState.checkInDate,
              checkOutDate: prevState.checkOutDate,
              selectedArea: e.target.value,
            };
          });
        }}
      >
        <option value="ALL">すべてのエリア</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
};

export default AreaSelector;
