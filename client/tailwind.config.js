/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        BrownDark : '#34201A',
        BrownLight : '#EFDEA1',
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
});

