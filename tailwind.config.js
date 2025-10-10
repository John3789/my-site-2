/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Custom screen for tablet landscape
        'tab-land': { 'raw': '(orientation: landscape) and (min-width: 900px) and (max-width: 1400px)' },
      },
    },
  },
  plugins: [],
};
