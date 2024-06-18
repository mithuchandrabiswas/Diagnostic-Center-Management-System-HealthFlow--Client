/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lightGray: '#f4f4f9',
          blue: '#0073e6',
        },
        accent: {
          darkGray: '#333333',
        },
        background: {
          white: '#FFFFFF',
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}
