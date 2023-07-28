/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica\\ Neue', 'sans-serif'],
      },
      colors: {
        bgPrimary: 'var(--background-primary-rgb)',
        fgPrimary: 'var(--foreground-primary-rgb)',
        bgSecondary: 'var(--background-secondary-rgb)',
        fgSecondary: 'var(--foreground-secondary-rgb)',
        bgTertiary: 'var(--background-tertiary-rgb)',
        fgTertiary: 'var(--foreground-tertiary-rgb)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(var(--gradient-stops))',
      },
      keyframes: {
        slideInY: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideInX: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        slideInY: 'slideInY 150ms linear',
        slideInX: 'slideInX 1000ms linear',
      },
    },
  },
  plugins: [],
};
