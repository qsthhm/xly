'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 清理旧播放器并创建新播放器
  const recreatePlayer = () => {
    // 设置加载状态
    setIsLoading(true);
    setError(null);
    
    // 移除所有现有视频元素
    if (containerRef.current) {
      // 清理旧的播放器实例
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 重要：将容器背景色设置为与全局背景一致
      containerRef.current.style.backgroundColor = '#141414';
      
      // 创建新的video元素
      const videoElement = document.createElement('video');
      videoElement.id = 'player-container-id';
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      // 明确设置背景色
      videoElement.style.backgroundColor = '#141414'; 
      containerRef.current.appendChild(videoElement);
      
      // 初始化播放器
      if (typeof window.TCPlayer === 'function') {
        try {
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true
          });
          
          // 监听播放器事件
          playerInstanceRef.current.on('error', (err: any) => {
            console.error('播放器错误:', err);
            setError('视频加载失败，请稍后再试');
            setIsLoading(false);
          });
          
          playerInstanceRef.current.on('ready', () => {
            setIsLoading(false);
          });
          
          playerInstanceRef.current.on('timeupdate', () => {
            if (isLoading) setIsLoading(false);
          });
          
        } catch (error) {
          console.error('播放器初始化错误:', error);
          setError('播放器初始化失败');
          setIsLoading(false);
        }
      }
    }
  };

  // 脚本加载完成时
  useEffect(() => {
    if (scriptLoaded && fileId) {
      // 延迟一点初始化，确保DOM和播放器脚本都准备好
      const timer = setTimeout(() => {
        recreatePlayer();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, fileId, appId, psign]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, []);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };
  
  // 强制背景色以确保一致性
  useEffect(() => {
    // 设置播放器背景色的函数
    const fixPlayerBackground = () => {
      // 明确设置容器背景色
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = '#141414';
      }
      
      // 设置视频元素背景色
      const videoEl = document.getElementById('player-container-id');
      if (videoEl) {
        videoEl.style.backgroundColor = '#141414';
      }
    };
    
    // 初始设置
    fixPlayerBackground();
    
    // 设置一个定时器，在页面加载后和播放器初始化期间多次尝试设置背景色
    const intervals = [100, 500, 1000, 2000, 5000];
    const timers = intervals.map(interval => setTimeout(fixPlayerBackground, interval));
    
    return () => {
      // 清理所有定时器
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ backgroundColor: '#141414' }}>
      {/* 使用内联样式强制设置背景色，确保与全局深色模式背景一致 */}
      <div className="absolute inset-0 bg-[#141414] dark:bg-[#141414]"></div>
      
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 - 简化为单个转圈动画 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] dark:bg-[#141414] z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#202020]/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* 错误状态 - 保持简洁 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] z-10">
          <div className="bg-[#202020] p-5 rounded-lg max-w-xs text-center">
            <p className="text-gray-200 mb-4">{error}</p>
            <button 
              onClick={recreatePlayer}
              className="px-4 py-2 bg-[#C15F3C] text-white text-sm rounded-lg hover:bg-[#A94F32] transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 - 使用内联样式和类同时指定背景色 */}
      <div ref={containerRef} className="w-full h-full bg-[#141414] dark:bg-[#141414]" style={{ backgroundColor: '#141414' }}></div>
    </div>
  );
}