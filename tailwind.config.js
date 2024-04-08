/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          base: "#06BCC1",
          "dark-5": "#02393B",
          "dark-4": "#045F62",
          "dark-3": "#06989D",
          "dark-2": "#06ACB2",
          "dark-1": "#06BFC6",
          "light-1": "#07D3DA",
          "light-2": "#07E6ED",
          "light-3": "#12F0F8",
          "light-4": "#9DF8FB",
        },
        secondary: {
          base: "#F7B2B7",
          "dark-1": "#5C0A10",
          "light-1": "#FBDADC",
        },
      },
    },
  },
}
