'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';

interface PasswordProtectionProps {
  children: React.ReactNode;
  password: string;
  onContactClick: () => void;
}

export default function PasswordProtection({ children, password, onContactClick }: PasswordProtectionProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 检查本地存储中是否已经验证过密码和锁定状态
  useEffect(() => {
    const authenticated = localStorage.getItem('resumeAuthenticated') === 'true';
    
    // 检查是否被锁定
    const lockedUntil = localStorage.getItem('resumeLocked');
    if (lockedUntil) {
      const lockTime = parseInt(lockedUntil, 10);
      const now = new Date().getTime();
      
      if (now < lockTime) {
        // 仍在锁定期
        setIsLocked(true);
        const remainingTime = Math.ceil((lockTime - now) / 1000);
        setLockTimer(remainingTime);
        startLockdownTimer(remainingTime);
      } else {
        // 锁定已过期
        localStorage.removeItem('resumeLocked');
        localStorage.removeItem('resumeAttempts');
        setAttempts(0);
      }
    } else {
      // 恢复尝试次数
      const savedAttempts = localStorage.getItem('resumeAttempts');
      if (savedAttempts) {
        setAttempts(parseInt(savedAttempts, 10));
      }
    }
    
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  // 启动锁定倒计时
  const startLockdownTimer = (seconds: number) => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          // 时间到，解除锁定
          if (timerRef.current) clearInterval(timerRef.current);
          setIsLocked(false);
          localStorage.removeItem('resumeLocked');
          localStorage.removeItem('resumeAttempts');
          setAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 验证密码
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;
    
    if (inputPassword === password) {
      // 密码正确
      setIsAuthenticated(true);
      localStorage.setItem('resumeAuthenticated', 'true');
      setError('');
      // 重置尝试次数
      setAttempts(0);
      localStorage.removeItem('resumeAttempts');
    } else {
      // 密码错误，增加尝试次数
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('resumeAttempts', newAttempts.toString());
      
      // 设置错误消息
      if (newAttempts >= 5) {
        // 5次尝试后锁定30秒
        const lockTime = new Date().getTime() + 30 * 1000;
        localStorage.setItem('resumeLocked', lockTime.toString());
        setIsLocked(true);
        setLockTimer(30);
        setError('尝试次数过多，请等待30秒后再试');
        startLockdownTimer(30);
      } else if (newAttempts >= 3) {
        setError(`密码不正确，请重试。剩余尝试次数: ${5 - newAttempts}`);
      } else {
        setError('密码不正确，请重试');
      }
      
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
      <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414]">
        <Navigation onContactClick={onContactClick} />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-[#C15F3C] rounded-full animate-spin"></div>
        </div>
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
    <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414]">
      <Navigation onContactClick={onContactClick} />
      
      <div className="flex items-center justify-center px-4 h-[calc(100vh-64px)]">
        <div className="bg-white dark:bg-[#202020] rounded-xl p-6 max-w-xs w-full border border-[#E9E8E5] dark:border-[#333333]">
          {/* 锁图标居中显示 */}
          <div className="flex flex-col items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-gray-300 mb-3">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">提示：密码是"daya"</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#2D2D2D] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C15F3C] text-gray-900 dark:text-gray-100 text-center"
                autoFocus
                disabled={isLocked}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              
              {isLocked && (
                <p className="text-yellow-500 dark:text-yellow-400 text-sm mt-2">
                  账号已临时锁定，{lockTimer}秒后可重试
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className={`w-full ${isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C15F3C] hover:bg-[#A94F32]'} text-white py-3 rounded-full transition-colors`}
              disabled={isLocked}
            >
              确认
            </button>
            
            {/* 移除底部的提示文本 */}
          </form>
        </div>
      </div>
    </div>
  );
}