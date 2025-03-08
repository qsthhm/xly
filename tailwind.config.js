/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 你的主题色
        primary: '#C15F3C',
        
        // 修复深色模式背景色问题
        black: '#141414', // 覆盖默认黑色
        slate: {
          900: '#141414', // 覆盖slate-900，避免#0C111C颜色出现
        }
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'b': '0 0 4px 4px',
      }
    },
  },
  plugins: [],
}