/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nird': {
          'primary': '#58CC02',
          'primary-dark': '#46A302',
          'secondary': '#CE82FF',
          'accent': '#FFC800',
          'success': '#10B981',
          'danger': '#EF4444',
          'dark': '#0F172A',
          'dark-2': '#1E293B',
          'dark-3': '#334155',
        },
        'duolingo': {
          'green': '#58CC02',
          'dark-green': '#46A302',
          'blue': '#1CB0F6',
          'purple': '#CE82FF',
          'orange': '#FF9600',
          'yellow': '#FFC800',
          'red': '#FF4B4B',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
