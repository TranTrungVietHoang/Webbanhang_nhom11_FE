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
          dark: '#a15a5a',
          blue: '#1a73e8',
        },
        sidebar: {
          bg: '#1e1e1e',
          hover: '#2d2d2d',
        },
        dashboard: {
          bg: '#f4f4f4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
