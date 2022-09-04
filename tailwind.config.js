/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': 'blue',
      'secondary': 'navy',
      'alert': 'red',
      'black': 'black',
      'white': 'white',
      'red': 'red',
    },
    extend: {},
    fontFamily: {
      title: ['Lobster', 'cursive']
    }
  },
  plugins: [require('daisyui')],
}
