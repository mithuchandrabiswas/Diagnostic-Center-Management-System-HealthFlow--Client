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
          blue: '#007BFF',
          green: '#28A745',
        },
        secondary: {
          blue: '#E3F2FD',
          green: '#D4EDDA',
        },
        accent: {
          orange: '#FFC107',
          gray: '#6C757D',
        },
        text: {
          dark: '#343A40',
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

