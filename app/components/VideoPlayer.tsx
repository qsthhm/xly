'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化播放器
  useEffect(() => {
    // 确保只在客户端执行
    if (!containerRef.current) return;
    
    const initPlayer = () => {
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 创建video元素
      const videoElement = document.createElement('video');
      videoElement.id = 'player-container-id';
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      containerRef.current.appendChild(videoElement);
      
      // 初始化播放器
      try {
        if (typeof window.TCPlayer === 'function') {
          const player = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true
          });
          
          // 监听事件
          player.on('loadedmetadata', () => {
            setIsLoading(false);
          });
          
          player.on('playing', () => {
            setIsLoading(false);
          });
          
          player.on('error', () => {
            setIsLoading(false);
          });
          
          // 5秒后无论如何都隐藏加载状态
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
        }
      } catch (err) {
        console.error('播放器初始化错误:', err);
        setIsLoading(false);
      }
    };
    
    const tcPlayerScript = document.createElement('script');
    tcPlayerScript.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
    tcPlayerScript.async = true;
    
    tcPlayerScript.onload = () => {
      initPlayer();
    };
    
    document.body.appendChild(tcPlayerScript);
    
    return () => {
      // 清理
      document.body.removeChild(tcPlayerScript);
    };
  }, [fileId, appId, psign]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full bg-black"></div>
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <div className="w-12 h-12 border-4 border-gray-500/30 dark:border-gray-300/30 border-t-[#C15F3C] dark:border-t-[#C15F3C] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}