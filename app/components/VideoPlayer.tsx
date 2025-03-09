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
  const playerReadyRef = useRef(false);
  
  // 清理旧播放器并创建新播放器
  const recreatePlayer = () => {
    console.log('[VideoPlayer] 开始重新创建播放器, fileId:', fileId);
    // 设置加载状态
    setIsLoading(true);
    setError(null);
    playerReadyRef.current = false;
    
    // 移除所有现有视频元素
    if (containerRef.current) {
      // 清理旧的播放器实例
      if (playerInstanceRef.current) {
        try {
          console.log('[VideoPlayer] 销毁旧播放器实例');
          playerInstanceRef.current.pause();
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('[VideoPlayer] 播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 创建新的video元素 - 不设置背景色
      const videoElement = document.createElement('video');
      videoElement.id = 'player-container-id';
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('muted', ''); // 添加静音属性以提高自动播放成功率
      containerRef.current.appendChild(videoElement);
      
      // 初始化播放器
      if (typeof window.TCPlayer === 'function') {
        try {
          console.log('[VideoPlayer] 创建新播放器实例');
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true,
            muted: true, // 添加静音属性来允许自动播放
            controls: true
          });
          
          // 监听播放器事件
          playerInstanceRef.current.on('error', (err: any) => {
            console.error('[VideoPlayer] 播放器错误:', err);
            setError('视频加载失败，请稍后再试');
            setIsLoading(false);
          });
          
          playerInstanceRef.current.on('ready', () => {
            console.log('[VideoPlayer] 播放器准备就绪');
            setIsLoading(false);
            playerReadyRef.current = true;
            
            // 确保开始播放
            try {
              playerInstanceRef.current.play().catch((e: any) => {
                console.warn('[VideoPlayer] 自动播放失败，需要用户交互:', e);
              });
            } catch (e) {
              console.warn('[VideoPlayer] 播放尝试出错:', e);
            }
          });
          
          playerInstanceRef.current.on('loadstart', () => {
            console.log('[VideoPlayer] 视频开始加载');
          });
          
          playerInstanceRef.current.on('loadeddata', () => {
            console.log('[VideoPlayer] 视频数据已加载');
            if (isLoading) setIsLoading(false);
          });
          
          playerInstanceRef.current.on('canplay', () => {
            console.log('[VideoPlayer] 视频可以播放');
            if (isLoading) setIsLoading(false);
            
            // 再次尝试播放
            if (playerReadyRef.current) {
              try {
                playerInstanceRef.current.play().catch((e: any) => {
                  console.warn('[VideoPlayer] 自动播放在canplay时失败:', e);
                });
              } catch (e) {
                console.warn('[VideoPlayer] canplay播放尝试出错:', e);
              }
            }
          });
          
          playerInstanceRef.current.on('playing', () => {
            console.log('[VideoPlayer] 视频开始播放');
            if (isLoading) setIsLoading(false);
          });
          
          playerInstanceRef.current.on('pause', () => {
            console.log('[VideoPlayer] 视频已暂停');
          });
          
          playerInstanceRef.current.on('timeupdate', () => {
            if (isLoading) {
              console.log('[VideoPlayer] 视频时间更新，关闭加载状态');
              setIsLoading(false);
            }
          });
          
        } catch (error) {
          console.error('[VideoPlayer] 播放器初始化错误:', error);
          setError('播放器初始化失败');
          setIsLoading(false);
        }
      } else {
        console.error('[VideoPlayer] TCPlayer不可用');
        setError('播放器加载失败，请刷新页面');
        setIsLoading(false);
      }
    }
  };

  // 脚本加载完成时
  useEffect(() => {
    if (scriptLoaded && fileId) {
      console.log('[VideoPlayer] 脚本已加载, fileId已变更:', fileId);
      // 延迟一点初始化，确保DOM和播放器脚本都准备好
      const timer = setTimeout(() => {
        recreatePlayer();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, fileId, appId, psign]);

  // fileId 变化时
  useEffect(() => {
    if (scriptLoaded && fileId && playerInstanceRef.current) {
      console.log('[VideoPlayer] fileId变更，重新创建播放器');
      // 当视频ID变化时，重新创建播放器
      const timer = setTimeout(() => {
        recreatePlayer();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fileId]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      console.log('[VideoPlayer] 组件卸载，清理播放器');
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.pause();
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('[VideoPlayer] 播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, []);

  const handleScriptLoad = () => {
    console.log('[VideoPlayer] 播放器脚本已加载');
    setScriptLoaded(true);
  };

  // 手动播放处理
  const handleManualPlay = () => {
    if (playerInstanceRef.current) {
      console.log('[VideoPlayer] 用户点击播放按钮');
      try {
        playerInstanceRef.current.play().catch((e: any) => {
          console.error('[VideoPlayer] 手动播放失败:', e);
        });
      } catch (e) {
        console.error('[VideoPlayer] 手动播放尝试出错:', e);
      }
    } else {
      recreatePlayer();
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 - 简化为单个转圈动画，使用透明背景 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 dark:bg-black/40">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#202020]/30 dark:border-[#202020]/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-white">视频加载中...</p>
          </div>
        </div>
      )}
      
      {/* 错误状态 - 保持简洁，使用透明背景 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <div className="bg-white dark:bg-[#202020] p-5 rounded-lg max-w-xs text-center">
            <p className="text-gray-800 dark:text-gray-200 mb-4">{error}</p>
            <button 
              onClick={recreatePlayer}
              className="px-4 py-2 bg-[#C15F3C] text-white text-sm rounded-lg hover:bg-[#A94F32] transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 - 不设置任何背景色 */}
      <div ref={containerRef} className="w-full h-full" onClick={handleManualPlay}></div>
      
      {/* 提示用户点击播放的按钮，当视频未开始播放时显示 */}
      {!isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button 
            onClick={handleManualPlay}
            className="w-16 h-16 bg-[#C15F3C]/80 hover:bg-[#C15F3C] rounded-full flex items-center justify-center text-white pointer-events-auto opacity-70 hover:opacity-100 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}