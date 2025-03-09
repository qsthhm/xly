'use client';

import { useState, useEffect } from 'react';

interface PasswordProtectionProps {
  children: React.ReactNode;
  password: string;
}

export default function PasswordProtection({ children, password }: PasswordProtectionProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 检查本地存储中是否已经验证过密码
  useEffect(() => {
    const authenticated = localStorage.getItem('resumeAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  // 验证密码
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem('resumeAuthenticated', 'true');
      setError('');
    } else {
      setError('密码不正确，请重试');
      setInputPassword('');
    }
  };

  // 重新锁定页面
  const handleLock = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('resumeAuthenticated');
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-[#C15F3C] rounded-full animate-spin"></div>
      </div>
    );
  }

  // 如果已经验证通过，显示子组件内容
  if (isAuthenticated) {
    return (
      <div className="relative">
        {children}
        
        {/* 添加锁定按钮 */}
        <button 
          onClick={handleLock}
          className="fixed bottom-4 right-4 bg-[#C15F3C] text-white p-2 rounded-full shadow-lg hover:bg-[#A94F32] transition-colors"
          title="锁定简历"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
      </div>
    );
  }

  // 密码验证页面
  return (
    <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">简历访问受限</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">请输入密码继续访问</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2D2D2D] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C15F3C] text-gray-900 dark:text-gray-100"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#C15F3C] hover:bg-[#A94F32] text-white py-3 rounded-lg transition-colors"
          >
            确认
          </button>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            <p>提示：密码是"daya"</p>
          </div>
        </form>
      </div>
    </div>
  );
}