/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/sections/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    './node_modules/slick-carousel/slick/slick.css',
    './node_modules/slick-carousel/slick/slick-theme.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#B7957F61', // customize your light shade of primary color
          DEFAULT: '#EEAC7E', // customize your default shade of primary color
          dark: '#012320', // customize your dark shade of primary color
        }
      }
    },
  },
  plugins: [],
}

