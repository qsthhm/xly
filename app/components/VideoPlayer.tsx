'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 初始化播放器
  useEffect(() => {
    // 确保容器存在
    if (!containerRef.current) return;
    
    const initPlayer = () => {
      // 确保再次检查，因为回调时可能已经卸载组件
      if (!containerRef.current) return;
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 创建视频元素
      const video = document.createElement('video');
      video.id = `player-${Math.random().toString(36).substring(2, 9)}`;
      video.className = 'w-full h-full';
      video.setAttribute('preload', 'auto');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      containerRef.current.appendChild(video);
      
      // 初始化播放器
      if (window.TCPlayer) {
        try {
          window.TCPlayer(video.id, {
            fileID: fileId,
            appID: appId,
            psign: psign || '',
            autoplay: true
          });
        } catch (err) {
          console.error('播放器初始化失败:', err);
        }
      }
    };
    
    // 加载腾讯云播放器
    const scriptId = 'tcplayer-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
      script.async = false;
      script.onload = initPlayer;
      document.head.appendChild(script);
    } else {
      // 如果脚本已加载，直接初始化播放器
      initPlayer();
    }
    
    // 清理函数
    return () => {
      if (!containerRef.current) return;
      
      const videoElement = containerRef.current.querySelector('video');
      if (videoElement && window.TCPlayer) {
        try {
          // 尝试获取实例并销毁
          const playerInstance = (videoElement as any).__tcplayer__;
          if (playerInstance && typeof playerInstance.dispose === 'function') {
            playerInstance.dispose();
          }
        } catch (err) {
          console.error('销毁播放器失败:', err);
        }
      }
    };
  }, [fileId, appId, psign]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* 静态加载提示，不会自动隐藏 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-500/30 dark:border-gray-300/30 border-t-[#C15F3C] dark:border-t-[#C15F3C] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}