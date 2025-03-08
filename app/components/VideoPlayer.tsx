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
  const [playerReady, setPlayerReady] = useState(false);
  
  // 重置状态，为创建新播放器做准备
  const resetState = () => {
    setIsLoading(true);
    setError(null);
    setPlayerReady(false);
  };
  
  // 清理旧播放器并创建新播放器
  const recreatePlayer = () => {
    // 重置状态
    resetState();
    
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
      
      // 创建新的video元素
      const videoElement = document.createElement('video');
      videoElement.id = 'player-container-id';
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      containerRef.current.appendChild(videoElement);
      
      // 初始化播放器
      if (typeof window.TCPlayer === 'function') {
        try {
          console.log(`正在初始化播放器，视频ID: ${fileId}`);
          
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
          
          playerInstanceRef.current.on('loadedmetadata', () => {
            console.log('视频元数据已加载');
            setIsLoading(false);
            setPlayerReady(true);
          });
          
          playerInstanceRef.current.on('playing', () => {
            console.log('视频开始播放');
            setIsLoading(false);
            setPlayerReady(true);
          });
          
          // 添加更多事件监听以确保状态更新
          playerInstanceRef.current.on('canplay', () => {
            console.log('视频可以播放');
            setIsLoading(false);
          });
          
          // 30秒后如果仍在加载，则强制设置为非加载状态
          const timer = setTimeout(() => {
            if (isLoading) {
              console.log('强制结束加载状态');
              setIsLoading(false);
            }
          }, 3000);
          
          return () => clearTimeout(timer);
          
        } catch (error) {
          console.error('播放器初始化错误:', error);
          setError('播放器初始化失败');
          setIsLoading(false);
        }
      }
    }
  };

  // 监听视频ID变化，重新创建播放器
  useEffect(() => {
    if (scriptLoaded && fileId) {
      console.log(`视频ID变化: ${fileId}`);
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
          playerInstanceRef.current = null;
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
      }
    };
  }, []);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  // 主动监听播放器状态的备用方案
  useEffect(() => {
    if (isLoading && playerInstanceRef.current) {
      const checkPlayerState = setInterval(() => {
        try {
          const currentTime = playerInstanceRef.current.currentTime();
          if (currentTime > 0) {
            console.log('检测到播放进度，视频已开始播放');
            setIsLoading(false);
            clearInterval(checkPlayerState);
          }
        } catch (e) {
          // 忽略错误
        }
      }, 500);
      
      return () => clearInterval(checkPlayerState);
    }
  }, [isLoading, playerReady]);

  return (
    <div className="relative w-full aspect-video bg-black">
      {/* 使用与腾讯云后台生成的代码完全相同的脚本 */}
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-white">视频加载中...</p>
          </div>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-xs text-center">
            <p className="text-gray-800 dark:text-gray-200 mb-3">{error}</p>
            <button 
              onClick={recreatePlayer}
              className="px-3 py-1 bg-[#C15F3C] text-white text-sm rounded-full hover:bg-[#A94F32] transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}