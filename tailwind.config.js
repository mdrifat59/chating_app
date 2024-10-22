/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily:{
      jotione_Regular:["jotione-regular"],
      inter_Regular:["inter-regular"],
      inter_Bold:["inter-bold"],
      inter_medium:["inter-medium"],
      inter_semibold:["inter-semibold"],
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

