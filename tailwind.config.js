/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        subheading: '#337ab7',
        heading: '#404040',
        paragraph: 'rgba(45, 54, 99, 0.75)',
        buttonBg: '#009fe3',
        buttonText: '#333333',
        boxShadow: '#009fe3',
      },
      boxShadow: {
        'custom': '0px 4px 8px #009fe3',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}
