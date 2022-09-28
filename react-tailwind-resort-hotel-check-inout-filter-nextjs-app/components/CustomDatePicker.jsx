import DatePicker, {registerLocale} from 'react-datepicker';
import {forwardRef, useEffect, useRef, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import {format} from 'date-fns';
import ja from 'date-fns/locale/ja';
import {dayjs, ymdslash} from '../utils/dateUtil';
import {cx} from '@emotion/css';
registerLocale('ja', ja);

const _ButtonInput = ({value, onClick}, ref) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      type="button"
      className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
    >
      {format(new Date(value), 'yyyy年 MM月 dd日', {
        locale: ja,
      })}
    </button>
  );
};

const ButtonInput = forwardRef(_ButtonInput);

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(
    dayjs(ymdslash(dayjs(new Date()))).toDate()
  );
  const [endDate, setEndDate] = useState(
    dayjs(ymdslash(dayjs(new Date()).add(1, 'days'))).toDate()
  );

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate);
    }
    // eslint-disable-next-line
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
    // eslint-disable-next-line
  }, [startDate]);

  useEffect(() => {
    if (startDate > endDate) {
      return;
    }
    // do search etc...
    console.log(`startDate,endDate`, startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
      <div className="relative w-40">
        <DatePicker
          locale={'ja'}
          minDate={dayjs(new Date()).toDate()}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-left"
          customInput={<ButtonInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-lg text-gray-700">
                {format(date, 'MMMM yyyy', {
                  locale: ja,
                })}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={cx(
                    prevMonthButtonDisabled && `cursor-not-allowed opacity-50`,
                    `inline-flex p-1`,
                    `text-sm font-medium text-gray-700`,
                    `bg-white hover:bg-gray-50`,
                    `focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`,
                    `border border-gray-300 rounded shadow-sm`
                  )}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={cx(
                    nextMonthButtonDisabled && `cursor-not-allowed opacity-50`,
                    `inline-flex p-1`,
                    `text-sm font-medium text-gray-700`,
                    `bg-white hover:bg-gray-50`,
                    `focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`,
                    `border border-gray-300 rounded shadow-sm`
                  )}
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <div className="relative w-40">
        <DatePicker
          locale={'ja'}
          minDate={dayjs(new Date()).toDate()}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-right"
          customInput={<ButtonInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-lg text-gray-700">
                {format(date, 'MMMM yyyy', {
                  locale: ja,
                })}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={cx(
                    prevMonthButtonDisabled && `cursor-not-allowed opacity-50`,
                    `inline-flex p-1`,
                    `text-sm font-medium text-gray-700`,
                    `bg-white hover:bg-gray-50`,
                    `focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`,
                    `border border-gray-300 rounded shadow-sm`
                  )}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={cx(
                    nextMonthButtonDisabled && `cursor-not-allowed opacity-50`,
                    `inline-flex p-1`,
                    `text-sm font-medium text-gray-700`,
                    `bg-white hover:bg-gray-50`,
                    `focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`,
                    `border border-gray-300 rounded shadow-sm`
                  )}
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
