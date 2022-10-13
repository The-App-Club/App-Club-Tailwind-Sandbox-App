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

const yyyymmddhhmmss = (inputDay) => {
  return dayjs(inputDay).format('YYYY/MM/DD HH:mm:ss');
};

const formatRelativeTime = (inputDay) => {
  // https://day.js.org/docs/en/plugin/relative-time
  // https://zenn.dev/lulzneko/articles/handles-relative-datetime-in-dayjs
  // https://zenn.dev/catnose99/articles/ba540f5c233847
  return dayjs(inputDay).fromNow();
};

// console.log(yyyymmddhhmmss(dayjs(new Date())));

export {dayjs, ymdslash, yyyymmddhhmmss, formatRelativeTime};
