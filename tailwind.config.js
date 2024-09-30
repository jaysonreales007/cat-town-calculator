/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixelify': ['"VT323"', 'sans-serif'],
      },
      keyframes: {
        flip: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
        }
      },
      animation: {
        'flip': 'flip 2s linear infinite',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
