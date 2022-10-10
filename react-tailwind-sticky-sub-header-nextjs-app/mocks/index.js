import {AsyncWeather} from '@cicciosgamino/openweather-apis';
const weatherInstance = await new AsyncWeather();
const apiKey = 'HERE_YOUR_KEY';
weatherInstance.setApiKey(apiKey);
weatherInstance.setLang('ja');
weatherInstance.setCoordinates('41.7797357331468', '-5.45534528919309');

// https://openweathermap.org/current#:~:text=%3A%20200%0A%7D-,Fields%20in%20API%20response,-coord

// (async () => {
//   const response = await weatherInstance.getAllWeather();
//   console.log(response);
// })();

// $ time node mocks/index.js
// {
//   coord: { lon: -5.4553, lat: 41.7797 },
//   weather: [ { id: 804, main: 'Clouds', description: '厚い雲', icon: '04n' } ],
//   base: 'stations',
//   main: {
//     temp: 12.68,
//     feels_like: 11.23,
//     temp_min: 12.68,
//     temp_max: 15.58,
//     pressure: 1015,
//     humidity: 47,
//     sea_level: 1015,
//     grnd_level: 931
//   },
//   visibility: 10000,
//   wind: { speed: 2.98, deg: 226, gust: 3.75 },
//   clouds: { all: 100 },
//   dt: 1665381373,
//   sys: {
//     type: 2,
//     id: 2077769,
//     country: 'ES',
//     sunrise: 1665383282,
//     sunset: 1665424163
//   },
//   timezone: 7200,
//   id: 6362623,
//   name: 'San Martín de Valderaduey',
//   cod: 200
// }

// (async () => {
//   const response = await weatherInstance.getSmartJSON();
//   console.log(response);
// })();

// $ time node mocks/index.js
// {
//   temp: 12.68,
//   humidity: 47,
//   pressure: 1015,
//   description: '厚い雲',
//   weathercode: 804,
//   rain: undefined
// }

// real	0m0.542s
// user	0m0.110s
// sys	0m0.016s
