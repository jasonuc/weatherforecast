/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Inconsolata": ["Inconsolata", "ui-sans"],
        "Kanit": ["Kanit", "ui-sans"]
      },
      backgroundImage: {
        'cloud-1': 'url("/clouds-moving.gif")',
      },
      colors: {
        'coral': "#FF6F61"
      }
    },
  },
  plugins: [],
}