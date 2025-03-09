'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayer2Props {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer2({ fileId, appId, psign = "" }: VideoPlayer2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  
  // 清理播放器实例
  const destroyPlayer = () => {
    if (playerRef.current) {
      try {
        console.log('[VideoPlayer2] 销毁播放器实例');
        playerRef.current.dispose();
      } catch (e) {
        console.error('[VideoPlayer2] 销毁播放器错误:', e);
      }
      playerRef.current = null;
    }
  };
  
  // 初始化播放器
  const initPlayer = () => {
    console.log('[VideoPlayer2] 开始初始化播放器');
    setIsLoading(true);
    setError(null);
    
    if (!containerRef.current) {
      console.error('[VideoPlayer2] 容器元素不存在');
      return;
    }
    
    // 先销毁现有实例
    destroyPlayer();
    
    // 清空容器
    containerRef.current.innerHTML = '';
    
    // 创建视频元素
    const videoElement = document.createElement('video');
    videoElement.id = 'player-container-v2';
    videoElement.className = 'w-full h-full';
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('playsinline', '');
    containerRef.current.appendChild(videoElement);
    
    // 检查TCPlayer是否可用
    if (typeof window.TCPlayer !== 'function') {
      console.error('[VideoPlayer2] TCPlayer不可用');
      setError('播放器不可用，请刷新页面重试');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('[VideoPlayer2] 创建播放器实例:', fileId);
      playerRef.current = window.TCPlayer('player-container-v2', {
        fileID: fileId,
        appID: appId,
        psign: psign,
        autoplay: true
      });
      
      // 监听事件
      playerRef.current.on('error', (err: any) => {
        console.error('[VideoPlayer2] 播放器错误:', err);
        setError('视频加载失败，请稍后再试');
        setIsLoading(false);
      });
      
      playerRef.current.on('loadedmetadata', () => {
        console.log('[VideoPlayer2] 视频元数据已加载');
        setIsLoading(false);
      });
      
      playerRef.current.on('loadstart', () => {
        console.log('[VideoPlayer2] 视频开始加载');
      });
      
      playerRef.current.on('play', () => {
        console.log('[VideoPlayer2] 视频开始播放');
        setIsLoading(false);
      });
      
      playerRef.current.on('playing', () => {
        console.log('[VideoPlayer2] 视频正在播放');
        setIsLoading(false);
      });
      
      playerRef.current.on('timeupdate', () => {
        if (isLoading) {
          console.log('[VideoPlayer2] 视频时间更新，关闭加载状态');
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error('[VideoPlayer2] 初始化播放器错误:', err);
      setError('播放器初始化失败');
      setIsLoading(false);
    }
  };
  
  // 脚本加载处理
  const handleScriptLoad = () => {
    console.log('[VideoPlayer2] 播放器脚本已加载');
    setScriptReady(true);
  };
  
  // 监听scriptReady和fileId变化
  useEffect(() => {
    if (scriptReady && fileId) {
      console.log('[VideoPlayer2] 脚本就绪，初始化播放器');
      
      // 使用setTimeout确保DOM完全渲染
      const timer = setTimeout(() => {
        initPlayer();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [scriptReady, fileId, appId, psign]);
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      console.log('[VideoPlayer2] 组件卸载，清理播放器');
      destroyPlayer();
    };
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.min.js"
        strategy="beforeInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/20 dark:bg-gray-900/20">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#202020]/30 dark:border-[#202020]/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">视频加载中...</p>
          </div>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white dark:bg-[#202020] p-5 rounded-lg max-w-xs text-center">
            <p className="text-gray-800 dark:text-gray-200 mb-4">{error}</p>
            <button 
              onClick={initPlayer}
              className="px-4 py-2 bg-[#C15F3C] text-white text-sm rounded-lg hover:bg-[#A94F32] transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 */}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}