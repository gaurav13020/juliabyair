/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          primary: '#0EA5E9',
          secondary: '#38BDF8',
          light: '#F0F9FF',
          dark: '#0C4A6E',
        },
        cta: '#F97316',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
