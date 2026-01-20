/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ghost-green': '#E0F7FA',
        'turquoise': {
          DEFAULT: '#00BCD4',
          dark: '#00838F',
          light: '#B2EBF2',
        },
        'heading': '#004D5C',
        'body-text': '#37474F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
