/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const mergician = require('mergician');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bebop: {
          // https://tailwindcss.com/docs/theme#colors
          // https://colorhunt.co/palettes/night
          100: '#001E6C',
          200: '#035397',
          300: '#5089C6',
          400: '#FFAA4C',
        },
      },
    },
    // colors: mergician(colors, {
    //   bebop: {
    //     // https://tailwindcss.com/docs/theme#colors
    //     // https://colorhunt.co/palettes/night
    //     100: '#001E6C',
    //     200: '#035397',
    //     300: '#5089C6',
    //     400: '#FFAA4C',
    //   },
    // }),
  },
  plugins: [
    require('tailwindcss-no-scrollbar'),
    require('tailwind-capitalize-first-letter'),
  ],
};
