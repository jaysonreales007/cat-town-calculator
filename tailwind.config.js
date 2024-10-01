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
      },
      extend: {
        keyframes: {
          neonFlowHorizontal: {
            '0%, 100%': { opacity: '0', transform: 'translateX(-100%)' },
            '50%': { opacity: '1', transform: 'translateX(100%)' },
          },
          neonFlowVertical: {
            '0%, 100%': { opacity: '0', transform: 'translateY(-100%)' },
            '50%': { opacity: '1', transform: 'translateY(100%)' },
          },
        },
        animation: {
          'neon-flow-h': 'neonFlowHorizontal 4s infinite',
          'neon-flow-v': 'neonFlowVertical 4s infinite',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
