/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        indigo: {
          100: '#E0E7FF',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
        },
      },
    },
  },
  plugins: [],
};