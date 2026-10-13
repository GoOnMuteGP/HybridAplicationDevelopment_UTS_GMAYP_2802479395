/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121319",
        surface: "#1e1f26",
        primary: "#d0bcff",
        secondary: "#c0c1ff",
        text: "#e3e1eb",
        muted: "#cbc3d7",
      },
      fontFamily: {
        arial : ["Arial", "sans-serif"],
        monospace: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
}