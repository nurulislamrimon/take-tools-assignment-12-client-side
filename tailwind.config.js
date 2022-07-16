/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#570DF8",
      "secondary": "#37CDBE",
      "accent": "#F000B8",
      "neutral": "#3D4451",
      "base-100": "#FFFFFF",
      "info": "#3ABFF8",
      "success": "#36D399",
      "warning": "#FBBD23",
      "error": "#F87272",
    },
    fontFamily: {
      title: ['Lobster', 'cursive']
    }
  },
  plugins: [require('daisyui')],
}
