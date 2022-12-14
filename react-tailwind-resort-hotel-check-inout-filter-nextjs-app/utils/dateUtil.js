import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ja from 'dayjs/locale/ja';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.locale(ja);
dayjs.tz.setDefault('Asia/Tokyo');

const ymdslash = (inputDay) => {
  return dayjs(inputDay).format('YYYY/MM/DD');
};

// console.log(ymdslash(dayjs(new Date()).add(1, 'days')));

export {dayjs, ymdslash};
