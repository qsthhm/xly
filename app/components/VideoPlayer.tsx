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
  
  // 生成唯一的播放器ID，确保每个实例都有唯一的ID
  const playerId = useRef(`player-container-${fileId}-${Math.random().toString(36).substring(2, 9)}`);
  
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
          playerInstanceRef.current = null;
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
      }
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 创建新的video元素 - 不设置背景色
      const videoElement = document.createElement('video');
      videoElement.id = playerId.current;
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      containerRef.current.appendChild(videoElement);
      
      // 确保TCPlayer已经加载
      if (typeof window.TCPlayer === 'function') {
        try {
          // 使用setTimeout确保DOM已更新
          setTimeout(() => {
            try {
              playerInstanceRef.current = window.TCPlayer(playerId.current, {
                fileID: fileId,
                appID: appId,
                psign: psign,
                autoplay: true
              });
              
              // 监听播放器事件
              playerInstanceRef.current.on('error', (err: any) => {
                console.error('播放器错误:', err);
                setError('视频加载失败，请刷新页面');
                setIsLoading(false);
              });
              
              playerInstanceRef.current.on('ready', () => {
                console.log('播放器准备就绪');
                setIsLoading(false);
              });
              
              playerInstanceRef.current.on('load', () => {
                console.log('视频已加载');
                setIsLoading(false);
              });
              
              playerInstanceRef.current.on('timeupdate', () => {
                if (isLoading) {
                  console.log('视频播放中，关闭加载状态');
                  setIsLoading(false);
                }
              });
              
              // 额外的事件监听，帮助调试
              playerInstanceRef.current.on('play', () => {
                console.log('视频开始播放');
                setIsLoading(false);
              });
              
              playerInstanceRef.current.on('pause', () => {
                console.log('视频已暂停');
              });
              
              // 强制开始播放
              setTimeout(() => {
                try {
                  playerInstanceRef.current.play();
                } catch (e) {
                  console.error('强制播放失败:', e);
                }
              }, 1000);
              
            } catch (initError) {
              console.error('播放器初始化错误(内部):', initError);
              setError('播放器初始化失败，请刷新页面');
              setIsLoading(false);
            }
          }, 300);
        } catch (error) {
          console.error('播放器初始化错误(外部):', error);
          setError('播放器初始化失败，请刷新页面');
          setIsLoading(false);
        }
      } else {
        console.error('TCPlayer未加载');
        setError('播放器未加载，请刷新页面');
        setIsLoading(false);
      }
    }
  };

  // 监听fileId变化，重新创建播放器
  useEffect(() => {
    // 当fileId改变时，更新playerId以避免ID冲突
    playerId.current = `player-container-${fileId}-${Math.random().toString(36).substring(2, 9)}`;
    
    if (scriptLoaded) {
      // 清理旧的播放器
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
          playerInstanceRef.current = null;
        } catch (e) {
          console.error('更新时播放器销毁错误:', e);
        }
      }
      
      // 延迟一点初始化，确保DOM和播放器脚本都准备好
      const timer = setTimeout(() => {
        recreatePlayer();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, fileId, appId, psign]);

  // 脚本加载完成时
  useEffect(() => {
    if (scriptLoaded) {
      console.log('播放器脚本加载完成');
      recreatePlayer();
    }
  }, [scriptLoaded]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
          playerInstanceRef.current = null;
        } catch (e) {
          console.error('卸载时播放器销毁错误:', e);
        }
      }
    };
  }, []);

  const handleScriptLoad = () => {
    console.log('播放器脚本onLoad事件触发');
    setScriptLoaded(true);
  };

  // 刷新页面
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.v4.9.0.min.js"
        strategy="beforeInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#202020]/30 dark:border-[#202020]/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-gray-800 dark:text-gray-200">视频加载中...</p>
          </div>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
          <div className="bg-white dark:bg-[#202020] p-5 rounded-lg max-w-xs text-center">
            <p className="text-gray-800 dark:text-gray-200 mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-[#C15F3C] text-white text-sm rounded-lg hover:bg-[#A94F32] transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}