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
          foreground: 'rgb(var(--