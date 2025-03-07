'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // 默认使用dark模式
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // 只在客户端执行，避免服务器端渲染不匹配
  useEffect(() => {
    setMounted(true);
    
    // 获取保存的主题或系统默认主题
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemTheme);
    }
  }, []);

  // 当主题变化时应用到HTML元素
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // 先移除两种类，再添加当前选择的类
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // 切换主题
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // 避免客户端/服务器端不匹配，如果未挂载则返回children
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}