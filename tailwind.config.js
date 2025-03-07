/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: 'rgb(var(--border) / <alpha-value>)',
          input: 'rgb(var(--input) / <alpha-value>)',
          ring: 'rgb(var(--ring) / <alpha-value>)',
          background: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
          
          primary: {
            DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
            foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
            foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
            foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
          },
          card: {
            DEFAULT: 'rgb(var(--card) / <alpha-value>)',
            foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
    },
    plugins: [],
  }