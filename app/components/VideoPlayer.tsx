'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化播放器
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === 'undefined') return;
    
    // 确保DOM元素已渲染
    if (!containerRef.current) return;
    
    // 设置加载状态
    setIsLoading(true);
    
    // 清理现有播放器
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
      } catch (e) {
        console.error('播放器销毁错误:', e);
      }
      playerRef.current = null;
    }
    
    // 清空容器
    containerRef.current.innerHTML = '';
    
    // 创建video元素
    const videoElement = document.createElement('video');
    videoElement.id = 'player-container-id';
    videoElement.className = 'w-full h-full bg-black';
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('x5-playsinline', '');
    
    // 添加video元素到容器
    containerRef.current.appendChild(videoElement);
    
    // 初始化播放器
    const initializePlayer = () => {
      try {
        if (typeof window.TCPlayer === 'function') {
          playerRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true
          });
          
          // 监听事件
          playerRef.current.on('error', (err: any) => {
            console.error('播放器错误:', err);
          });
          
          playerRef.current.on('loadeddata', () => {
            setIsLoading(false);
          });
          
          playerRef.current.on('playing', () => {
            setIsLoading(false);
          });
          
          // 5秒后无论如何都关闭加载状态
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
          
          return true;
        }
        return false;
      } catch (err) {
        console.error('播放器初始化错误:', err);
        return false;
      }
    };
    
    // 如果TCPlayer已加载，直接初始化
    if (typeof window.TCPlayer === 'function') {
      initializePlayer();
      return;
    }
    
    // 否则等待脚本加载
    const checkInterval = setInterval(() => {
      if (typeof window.TCPlayer === 'function') {
        clearInterval(checkInterval);
        initializePlayer();
      }
    }, 200);
    
    // 10秒后清除检查，避免无限循环
    const timeoutId = setTimeout(() => {
      clearInterval(checkInterval);
      setIsLoading(false);
    }, 10000);
    
    // 组件卸载时清理
    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeoutId);
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerRef.current = null;
      }
    };
  }, [fileId, appId, psign]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black dark:bg-black">
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full bg-black"></div>
      
      {/* 加载状态 - 只在isLoading为true时显示 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-12 h-12 border-4 border-gray-500/30 dark:border-gray-300/30 border-t-[#C15F3C] dark:border-t-[#C15F3C] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}