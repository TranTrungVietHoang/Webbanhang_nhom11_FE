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
          light: '#d28b8b',
          DEFAULT: '#bb6b6b',
          dark: '#a15555',
        },
        sidebar: {
          bg: '#252525',
          hover: '#333333',
        },
        dashboard: {
          bg: '#f4f4f4',
        }
      }
    },
  },
  plugins: [],
}
