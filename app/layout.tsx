// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from './components/ThemeProvider';

export const metadata: Metadata = {
  title: '个人作品集 | 视频展示',
  description: '使用腾讯云VOD的个人视频作品集展示',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link 
          href="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.min.css" 
          rel="stylesheet"
        />
      </head>
      <ThemeProvider>
        <body className="antialiased transition-colors duration-200">
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

// app/components/ThemeProvider.tsx
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
  const [theme, setTheme] = useState<Theme>('dark');

  // 检测系统首选主题和存储的主题设置
  useEffect(() => {
    // 首先检查本地存储
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // 当主题变化时更新文档
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// app/components/ThemeToggle.tsx
'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

// app/globals.css (添加到现有的globals.css中)
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 255, 255, 255;
    --foreground: 15, 15, 15;
    
    --card: 255, 255, 255;
    --card-foreground: 15, 15, 15;
    
    --border: 230, 230, 230;
    --input: 230, 230, 230;
    
    --primary: 15, 15, 15;
    --primary-foreground: 255, 255, 255;
    
    --secondary: 245, 245, 245;
    --secondary-foreground: 15, 15, 15;
    
    --accent: 230, 230, 230;
    --accent-foreground: 15, 15, 15;
    
    --ring: 0, 0, 0;
    
    --radius: 0.5rem;
  }

  .dark {
    --background: 15, 15, 15;
    --foreground: 255, 255, 255;
    
    --card: 35, 35, 35;
    --card-foreground: 255, 255, 255;
    
    --border: 48, 48, 48;
    --input: 48, 48, 48;
    
    --primary: 255, 255, 255;
    --primary-foreground: 15, 15, 15;
    
    --secondary: 35, 35, 35;
    --secondary-foreground: 255, 255, 255;
    
    --accent: 48, 48, 48;
    --accent-foreground: 255, 255, 255;
    
    --ring: 212, 212, 212;
  }
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}

/* 自定义YouTube风格组件 */
@layer components {
  .yt-button {
    @apply rounded-full px-4 py-2 font-medium transition-colors duration-200;
  }
  
  .yt-button-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .yt-button-secondary {
    @apply bg-secondary text-secondary-foreground hover:bg-accent;
  }
  
  .yt-nav-button {
    @apply rounded-lg p-2 transition-colors duration-200 hover:bg-secondary;
  }
  
  .yt-video-card {
    @apply overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow duration-200;
  }
}

/* 修改滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-accent rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-accent-foreground/40;
}

/* 确保暗模式下正确显示 */
.dark ::-webkit-scrollbar-thumb {
  @apply bg-accent;
}

.dark ::-webkit-scrollbar-thumb:hover {
  @apply bg-accent-foreground/30;
}