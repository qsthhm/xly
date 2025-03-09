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
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tcScriptLoaded, setTcScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初始化播放器
  useEffect(() => {
    // 如果脚本未加载完成，不执行后续操作
    if (!tcScriptLoaded) return;
    
    // 确保DOM元素已渲染
    if (!containerRef.current) return;
    
    // 清理现有的播放器实例
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
      } catch (e) {
        console.error('销毁播放器失败:', e);
      }
      playerRef.current = null;
    }

    // 清空容器内容
    containerRef.current.innerHTML = '';
    
    // 创建video元素
    const videoElement = document.createElement('video');
    videoElement.id = 'player-container-id';
    videoElement.className = 'w-full h-full';
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('x5-playsinline', '');
    containerRef.current.appendChild(videoElement);
    
    // 初始化播放器
    try {
      if (typeof window.TCPlayer === 'function') {
        console.log('初始化播放器:', fileId);
        playerRef.current = window.TCPlayer('player-container-id', {
          fileID: fileId,
          appID: appId,
          psign: psign,
          autoplay: true
        });
        
        // 绑定事件
        playerRef.current.on('error', (err: any) => {
          console.error('播放器错误:', err);
          setError('视频加载失败，请刷新页面重试');
        });
        
        playerRef.current.on('ready', () => {
          console.log('播放器就绪');
          setIsLoading(false);
        });
        
        playerRef.current.on('play', () => {
          console.log('视频开始播放');
          setIsLoading(false);
        });
        
        playerRef.current.on('playing', () => {
          console.log('视频播放中');
          setIsLoading(false);
        });
        
        playerRef.current.on('timeupdate', () => {
          setIsLoading(false);
        });
      } else {
        console.error('TCPlayer不可用');
        setError('播放器加载失败，请刷新页面重试');
      }
    } catch (err) {
      console.error('初始化播放器错误:', err);
      setError('初始化播放器失败，请刷新页面重试');
    }
    
    // 组件卸载时清理播放器
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error('销毁播放器失败:', e);
        }
        playerRef.current = null;
      }
    };
  }, [fileId, appId, psign, tcScriptLoaded]);
  
  // 处理刷新页面
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      {/* 播放器脚本 */}
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('TCPlayer脚本加载完成');
          setTcScriptLoaded(true);
        }}
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