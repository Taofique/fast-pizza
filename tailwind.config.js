/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Mono', 'monospace'],
      },
      height: {
        dvh: '100dvh', // Create new utility h-dvh
        svh: '100svh',
        lvh: '100lvh',
      },
    },
  },
  plugins: [],
};
