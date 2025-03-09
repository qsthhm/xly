'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const attemptPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // 完全清理现有播放器
  const cleanupPlayer = () => {
    if (playerRef.current) {
      try {
        // 暂停播放，避免声音继续播放
        if (typeof playerRef.current.pause === 'function') {
          playerRef.current.pause();
        }
        
        // 销毁播放器实例
        if (typeof playerRef.current.dispose === 'function') {
          playerRef.current.dispose();
        }
      } catch (e) {
        console.error('播放器销毁错误:', e);
      }
      playerRef.current = null;
    }
    
    // 清理重试计时器
    if (attemptPlayRef.current) {
      clearInterval(attemptPlayRef.current);
      attemptPlayRef.current = null;
    }
    
    // 移除全局播放器数组中的残留实例
    if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
      window.__tcplayers = [];
    }
  };
  
  // 尝试播放函数
  const attemptPlay = () => {
    if (playerRef.current && typeof playerRef.current.play === 'function') {
      try {
        playerRef.current.play();
        console.log('尝试播放视频:', fileId);
      } catch (err) {
        console.error('播放视频失败:', err);
      }
    }
  };
  
  // 监听fileId变化，重新初始化
  useEffect(() => {
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 先清理现有播放器
    cleanupPlayer();
    
    // 设置初始加载状态
    setIsLoading(true);
    
    // 清空容器内容
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // 为每个视频生成唯一ID
    const playerId = `player-${fileId}-${Math.random().toString(36).substring(2, 9)}`;
    
    // 创建video元素
    if (containerRef.current) {
      const video = document.createElement('video');
      video.id = playerId;
      video.className = 'w-full h-full';
      video.setAttribute('preload', 'auto');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x5-playsinline', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('muted', '');
      containerRef.current.appendChild(video);
      
      // 添加自动播放事件
      video.addEventListener('canplay', () => {
        video.muted = false; // 取消静音
        video.play().catch(err => console.log('自动播放失败:', err));
      });
    }
    
    // 初始化播放器函数
    const initPlayer = () => {
      if (!window.TCPlayer || !containerRef.current) return;
      
      try {
        // 确保DOM已就绪
        const videoElement = document.getElementById(playerId);
        if (!videoElement) return;
        
        // 初始化播放器
        playerRef.current = window.TCPlayer(playerId, {
          fileID: fileId,
          appID: appId,
          psign: psign || '',
          autoplay: true
        });
        
        // 监听事件
        if (playerRef.current) {
          // 各种可能表明视频已加载的事件
          const events = ['loadeddata', 'loadedmetadata', 'canplay', 'canplaythrough', 'play', 'playing'];
          
          events.forEach(event => {
            playerRef.current.on(event, () => {
              setIsLoading(false);
            });
          });
          
          // 错误处理
          playerRef.current.on('error', () => {
            setIsLoading(false);
          });
          
          // 手动播放尝试
          attemptPlay();
          
          // 设置重复尝试播放的计时器
          attemptPlayRef.current = setInterval(() => {
            attemptPlay();
          }, 1000);
          
          // 10秒后清除重试计时器
          setTimeout(() => {
            if (attemptPlayRef.current) {
              clearInterval(attemptPlayRef.current);
              attemptPlayRef.current = null;
            }
          }, 10000);
        }
        
        // 无论如何，3秒后关闭加载状态
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        console.error('播放器初始化错误:', err);
        setIsLoading(false);
      }
    };
    
    // 尝试加载腾讯云播放器
    if (typeof window.TCPlayer === 'function') {
      // 如果已加载，直接初始化
      initPlayer();
    } else {
      // 否则加载脚本
      const scriptId = 'tcplayer-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
        script.async = false;
        
        script.onload = () => {
          // 脚本加载完成后初始化
          initPlayer();
        };
        
        document.head.appendChild(script);
      } else {
        // 脚本已存在但可能尚未加载完成
        const checkTCPlayer = setInterval(() => {
          if (typeof window.TCPlayer === 'function') {
            clearInterval(checkTCPlayer);
            initPlayer();
          }
        }, 100);
        
        // 最多等待5秒
        setTimeout(() => {
          clearInterval(checkTCPlayer);
          setIsLoading(false);
        }, 5000);
      }
    }
    
    // 组件卸载时清理
    return () => {
      cleanupPlayer();
    };
  }, [fileId, appId, psign]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* 加载状态 - 只在isLoading为true时显示 */}
      {isLoading && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-gray-500/30 dark:border-gray-300/30 border-t-[#C15F3C] dark:border-t-[#C15F3C] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}