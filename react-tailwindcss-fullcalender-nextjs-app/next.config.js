const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/react',
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});
