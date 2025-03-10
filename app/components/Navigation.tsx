'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';

// 动态导入主题切换组件
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => (
    <button className="flex items-center justify-center w-9 h-9 rounded-full">
      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </button>
  )
});

interface NavigationProps {
  onContactClick: () => void;
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // 获取当前页面名称
  const getCurrentPageName = () => {
    if (pathname === '/') return '作品';
    if (pathname === '/resume') return '简历';
    return '';
  };
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 关闭菜单当路径改变
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  // 监听窗口尺寸以在宽屏时关闭移动菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 优雅地处理视频播放器清理和导航
  const handleNavigateToHome = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // 播放logo动画效果
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    
    // 清理视频播放器实例 - 这是关键部分
    const cleanupVideoPlayers = () => {
      // 尝试清理腾讯播放器实例
      if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
        try {
          window.__tcplayers.forEach(player => {
            if (player && typeof player.dispose === 'function') {
              player.dispose();
            }
          });
          window.__tcplayers = [];
        } catch (err) {
          console.error('清理播放器失败:', err);
        }
      }
      
      // 找到所有视频元素并暂停它们
      document.querySelectorAll('video').forEach(video => {
        try {
          if (video && !video.paused) {
            video.pause();
          }
        } catch (err) {
          console.error('暂停视频失败:', err);
        }
      });
    };
    
    // 当前已在首页 - 清理和重新加载视频
    if (pathname === '/') {
      cleanupVideoPlayers();
      
      // 使用Next.js路由器重新加载当前页面，但不强制刷新浏览器
      router.refresh();
      return;
    }
    
    // 不在首页 - 清理并导航
    cleanupVideoPlayers();
    router.push('/');
  }, [pathname, router]);
  
  if (!mounted) return null;
  
  const pageName = getCurrentPageName();
  
  return (
    <nav className="bg-[#F0EFE7] dark:bg-[#141414] sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* 左侧Logo和标题 */}
        <a 
          href="/"
          onClick={handleNavigateToHome}
          className="flex items-center space-x-2"
        >
          <div className={`relative w-8 h-8 rounded-full overflow-hidden ${isAnimating ? 'logo-animate' : 'logo-hover-rotate'}`}>
            <Image 
              src="/img/logo.png" 
              alt="许璐雅头像" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center">
            <span className="text-base font-medium text-gray-900 dark:text-gray-200">
              许璐雅
            </span>
            {pageName && (
              <>
                <span className="mx-1.5 text-gray-400 dark:text-gray-500">·</span>
                <span className="text-base text-gray-900 dark:text-gray-200">
                  {pageName}
                </span>
              </>
            )}
          </div>
        </a>
        
        {/* 桌面端导航菜单 */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            onClick={handleNavigateToHome}
            className={`text-base hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors ${
              pathname === '/' 
                ? 'text-[#C15F3C] dark:text-[#C15F3C] font-bold' 
                : 'text-gray-900 dark:text-gray-200'
            }`}
          >
            作品
          </a>
          <Link 
            href="/resume" 
            className={`text-base hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors ${
              pathname === '/resume' 
                ? 'text-[#C15F3C] dark:text-[#C15F3C] font-bold' 
                : 'text-gray-900 dark:text-gray-200'
            }`}
          >
            简历
          </Link>
          <button 
            onClick={onContactClick}
            className="text-base text-gray-900 dark:text-gray-200 hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors"
          >
            联系我
          </button>
          <ThemeToggle />
        </div>
        
        {/* 移动端菜单按钮 */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[#E3E2D9] dark:hover:bg-[#373737] rounded-full transition-colors"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* 移动端下拉菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F0EFE7] dark:bg-[#141414] border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto py-2 px-4 flex flex-col space-y-3">
            <a
              href="/"
              onClick={(e) => {
                handleNavigateToHome(e);
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-base hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors ${
                pathname === '/' 
                  ? 'text-[#C15F3C] dark:text-[#C15F3C] font-bold' 
                  : 'text-gray-900 dark:text-gray-200'
              }`}
            >
              作品
            </a>
            <Link 
              href="/resume" 
              className={`py-2 text-base hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors ${
                pathname === '/resume' 
                  ? 'text-[#C15F3C] dark:text-[#C15F3C] font-bold' 
                  : 'text-gray-900 dark:text-gray-200'
              }`}
            >
              简历
            </Link>
            <button 
              onClick={() => {
                onContactClick();
                setMobileMenuOpen(false);
              }}
              className="py-2 text-left text-base text-gray-900 dark:text-gray-200 hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors"
            >
              联系我
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}