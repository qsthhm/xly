'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const userPausedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // 清理单个播放器实例
  const cleanupPlayer = useCallback((player: any) => {
    if (player && typeof player.dispose === 'function') {
      try {
        player.dispose();
      } catch (err) {
        // 生产环境中使用更好的错误处理
      }
    }
  }, []);
  
  // 彻底清理所有视频播放器
  const cleanupAllPlayers = useCallback(() => {
    // 清理全局播放器数组
    if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
      try {
        // 创建副本，因为dispose过程中会修改数组
        [...window.__tcplayers].forEach(cleanupPlayer);
        window.__tcplayers = [];
      } catch (err) {
        // 生产环境中使用更好的错误处理
      }
    }
    
    // 清理当前组件的播放器引用
    cleanupPlayer(playerRef.current);
    playerRef.current = null;
    
    // 清理所有视频元素
    document.querySelectorAll('video').forEach(video => {
      try {
        if (video && !video.paused) {
          video.pause();
        }
        if (video.__tcplayer__) {
          delete video.__tcplayer__;
        }
      } catch (err) {
        // 生产环境中使用更好的错误处理
      }
    });
    
    // 重置状态
    userPausedRef.current = false;
  }, [cleanupPlayer]);
  
  // 添加请求拦截以阻止zuopin.my相关的错误
  useEffect(() => {
    // 只在客户端执行且只添加一次
    if (typeof window !== 'undefined' && !window.__tcplayerRequestIntercepted) {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        // 如果是zuopin.my的请求或包含[object Object]，则拦截
        if (
          (typeof url === 'string' && url.includes('zuopin.my')) || 
          (typeof url === 'string' && url.includes('[object'))
        ) {
          // 返回空响应，避免错误
          return Promise.resolve(new Response('', { status: 200 }));
        }
        // 其他请求正常处理
        return originalFetch.apply(this, arguments);
      };
      window.__tcplayerRequestIntercepted = true;
    }
  }, []);
  
  // 初始化播放器
  const initPlayer = useCallback((playerId: string) => {
    if (!window.TCPlayer || !containerRef.current) return;
    
    try {
      const videoElement = document.getElementById(playerId);
      if (!videoElement) return;
      
      // 确保参数都是字符串类型
      playerRef.current = window.TCPlayer(playerId, {
        fileID: String(fileId),
        appID: String(appId),
        psign: typeof psign === 'string' ? psign : '',
        autoplay: true,
        controls: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        poster: { style: "cover", src: "" }
      });
      
      // 播放器事件监听
      if (playerRef.current) {
        // 错误监听
        playerRef.current.on('error', (err: any) => {
          // 生产环境中可使用更好的日志系统
        });
        
        // 暂停事件
        playerRef.current.on('pause', () => {
          userPausedRef.current = true;
        });
        
        // 播放事件 - 如果用户已暂停，阻止自动继续播放
        playerRef.current.on('play', () => {
          if (userPausedRef.current) {
            setTimeout(() => {
              playerRef.current?.pause();
            }, 0);
          }
        });
        
        // 播放器就绪事件
        playerRef.current.on('ready', () => {
          userPausedRef.current = false;
          setIsLoading(false);
        });
        
        // 播放结束事件
        playerRef.current.on('ended', () => {
          // 可以在此处理播放结束逻辑
        });
      }
    } catch (err) {
      setIsLoading(false);
      // 生产环境中使用更好的错误处理
    }
  }, [fileId, appId, psign]);
  
  // 加载播放器脚本
  const loadPlayerScript = useCallback(() => {
    const scriptId = 'tcplayer-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
      script.async = true;
      
      document.head.appendChild(script);
    }
    
    return script;
  }, []);
  
  // 监听fileId变化，重新初始化
  useEffect(() => {
    // 重置加载状态
    setIsLoading(true);
    
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 清理之前的播放器
    cleanupAllPlayers();
    
    // 清空容器内容
    containerRef.current.innerHTML = '';
    
    // 为视频生成唯一ID
    const playerId = `player-${fileId}-${Math.random().toString(36).slice(2, 8)}`;
    
    // 创建video元素
    const video = document.createElement('video');
    video.id = playerId;
    video.className = 'w-full h-full';
    video.setAttribute('preload', 'auto');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    containerRef.current.appendChild(video);
    
    // 检查播放器脚本是否已加载
    if (typeof window.TCPlayer === 'function') {
      // 已加载，直接初始化
      initPlayer(playerId);
    } else {
      // 加载脚本
      const script = loadPlayerScript();
      
      // 脚本加载完成后初始化
      script.onload = () => {
        initPlayer(playerId);
      };
      
      // 脚本可能已存在但尚未加载完成，设置定时检查
      const checkTCPlayer = setInterval(() => {
        if (typeof window.TCPlayer === 'function') {
          clearInterval(checkTCPlayer);
          initPlayer(playerId);
        }
      }, 100);
      
      // 最多等待5秒
      setTimeout(() => {
        clearInterval(checkTCPlayer);
        if (isLoading) setIsLoading(false); // 超时后强制更新状态
      }, 5000);
    }
    
    // 组件卸载时清理
    return cleanupAllPlayers;
  }, [fileId, appId, psign, cleanupAllPlayers, initPlayer, loadPlayerScript, isLoading]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C15F3C] rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}