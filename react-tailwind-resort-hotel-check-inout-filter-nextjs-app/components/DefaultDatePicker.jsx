import DatePicker, {registerLocale} from 'react-datepicker';
import {forwardRef, useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import {format} from 'date-fns';
import ja from 'date-fns/locale/ja';

const DefaultDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date().setMonth(startDate.getMonth() + 1)
  );

  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);
  
  return (
    <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
      <span className="font-medium text-gray-900">Default Components:</span>
      <div className="relative w-40">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-left"
        />
      </div>
      <div className="relative w-40">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-right"
        />
      </div>
    </div>
  );
};

export default DefaultDatePicker;
