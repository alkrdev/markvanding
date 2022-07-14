module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: ["responsive", "group-hover", "hover", "focus", "active"],
  theme: {
    rotate: {
      '-180': '-180deg',
      '-90' : '-90deg',
      '-45' : '-45deg',
      '0'   : '0',
      '45'  : '45deg',
      '90'  : '90deg',
      '135' : '135deg',
      '180' : '180deg',
      '270' : '270deg',
    },
    extend: {},
  },
  plugins: [],
}
