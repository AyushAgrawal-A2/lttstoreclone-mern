/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica\\ Neue', 'sans-serif'],
    },
    extend: {
      colors: {
        bgPrimary: 'var(--background-primary-rgb)',
        fgPrimary: 'var(--foreground-primary-rgb)',
        bgSecondary: 'var(--background-secondary-rgb)',
        fgSecondary: 'var(--foreground-secondary-rgb)',
        fgTertiary: 'var(--foreground-tertiary-rgb)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(var(--gradient-stops))',
      },
    },
  },
  plugins: [],
};
