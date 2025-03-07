/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#355070',
        secondary: '#6d597a',
        tertiary: '#b56576',
        accent: '#e56b6f',
        highlight: '#eaac8b',
      },
      animation: {
        float: 'floating 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};