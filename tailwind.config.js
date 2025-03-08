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
          background: '#111111',  // 深色模式背景
          foreground: '#ffffff',  // 深色模式文本
          card: '#1e1e1e',  // 卡片背景
          'card-foreground': '#ffffff',  // 卡片文本
          border: '#333333',  // 边框颜色
          input: '#333333',  // 输入框
          ring: '#555555',  // 边框高亮
          primary: '#0070f3',  // 主要按钮颜色
          'primary-foreground': '#ffffff',  // 主要按钮文本
          secondary: '#202020',  // 次要按钮颜色
          'secondary-foreground': '#ffffff',  // 次要按钮文本
          accent: '#333333',  // 强调色
          'accent-foreground': '#ffffff',  // 强调文本
          destructive: '#ff0000',  // 危险操作
          'destructive-foreground': '#ffffff',  // 危险操作文本
          muted: '#202020',  // 弱化元素
          'muted-foreground': '#a0a0a0',  // 弱化文本
          success: '#10b981',  // 成功提示
          'success-foreground': '#ffffff',  // 成功提示文本
          info: '#0ea5e9',  // 信息提示
          'info-foreground': '#ffffff',  // 信息提示文本
          warning: '#f59e0b',  // 警告提示
          'warning-foreground': '#ffffff',  // 警告提示文本
          error: '#ef4444',  // 错误提示
          'error-foreground': '#ffffff',  // 错误提示文本
        },
      },
    },
    plugins: [],
  }