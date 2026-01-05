/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7F3',
          100: '#FFEDE6',
          200: '#FFD4C2',
          300: '#FFB899',
          400: '#FF9A6C',
          500: '#F47B48',
          600: '#E5632D',
          700: '#C54A1A',
          800: '#A33D16',
          900: '#863315',
        },
        brand: {
          orange: '#F47B48',
          gray: '#6B7280',
          dark: '#374151',
        }
      },
    },
  },
  plugins: [],
};
