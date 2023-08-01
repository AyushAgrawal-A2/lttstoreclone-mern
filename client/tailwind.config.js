/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--background-primary-rgb)',
        fgPrimary: 'var(--foreground-primary-rgb)',
        bgSecondary: 'var(--background-secondary-rgb)',
        fgSecondary: 'var(--foreground-secondary-rgb)',
        bgTertiary: 'var(--background-tertiary-rgb)',
        fgTertiary: 'var(--foreground-tertiary-rgb)',
        LTTOrange: 'var(--ltt-orange)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(var(--gradient-stops))',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        slideInY: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideInX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        grow: 'grow 100ms linear forwards',
        slideInY: 'slideInY 150ms linear',
        slideInX: 'slideInX 150ms linear',
      },
    },
  },
  plugins: [],
};
