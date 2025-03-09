'use client';

import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 仅在组件挂载时初始化一次脚本
  useEffect(() => {
    // 创建并添加脚本元素
    const script = document.createElement('script');
    script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
    script.async = true;
    
    script.onload = () => {
      initPlayer();
    };
    
    document.body.appendChild(script);
    
    // 清理函数
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // 当fileId变化时重新初始化播放器
  useEffect(() => {
    // 如果TCPlayer已经加载，初始化播放器
    if (typeof window.TCPlayer === 'function') {
      initPlayer();
    }
  }, [fileId, appId, psign]);
  
  // 初始化播放器
  const initPlayer = () => {
    if (!containerRef.current) return;
    
    // 清空容器
    containerRef.current.innerHTML = '';
    
    // 创建video元素
    const videoElement = document.createElement('video');
    videoElement.id = 'player-container-id';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('x5-playsinline', '');
    
    // 添加video元素到容器
    containerRef.current.appendChild(videoElement);
    
    // 初始化播放器
    try {
      if (typeof window.TCPlayer === 'function') {
        window.TCPlayer('player-container-id', {
          fileID: fileId,
          appID: appId,
          psign: psign,
          autoplay: true
        });
      }
    } catch (err) {
      console.error('播放器初始化错误:', err);
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black dark:bg-black">
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* 加载状态 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-600/30 dark:border-gray-400/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}