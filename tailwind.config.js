/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'honey': {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC300',  // Primary honey color
          600: '#CC9C00',
          700: '#997500',
          800: '#664E00',
          900: '#332700',
        },
        'hive': {
          50: '#F7F3ED',
          100: '#EFE7DB',
          200: '#DFCFB7',
          300: '#CFB793',
          400: '#BF9F6F',
          500: '#D4A76A',  // Wood beehive color
          600: '#8B5A3C',
          700: '#68442D',
          800: '#452D1E',
          900: '#23170F',
        },
        'bee': {
          DEFAULT: '#FFD700',  // Golden bee color
          dark: '#FFA500',     // Orange for stripes
        },
        'nature': {
          grass: '#4CAF50',
          sky: '#87CEEB',
          cloud: '#FFFFFF',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'buzz': 'buzz 0.1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        buzz: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(2px)' },
        },
      },
    },
  },
  plugins: [],
}
