'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  
  // 彻底清理所有视频播放器
  const cleanupAllPlayers = () => {
    // 清理全局播放器数组中的所有实例
    if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
      try {
        // 制作副本，因为dispose过程中会修改数组
        const players = [...window.__tcplayers];
        players.forEach(player => {
          if (player && typeof player.dispose === 'function') {
            player.dispose();
          }
        });
        window.__tcplayers = [];
      } catch (err) {
        console.error('清理全局播放器数组失败:', err);
      }
    }
    
    // 清理当前组件的播放器引用
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.dispose === 'function') {
          playerRef.current.dispose();
        }
      } catch (e) {
        console.error('清理当前播放器失败:', e);
      }
      playerRef.current = null;
    }
    
    // 清理所有视频元素
    document.querySelectorAll('video').forEach(video => {
      try {
        if (video && !video.paused) {
          video.pause();
        }
        // 移除视频元素上的tcplayer引用
        if (video.__tcplayer__) {
          delete video.__tcplayer__;
        }
      } catch (err) {
        console.error('清理视频元素失败:', err);
      }
    });
  };
  
  // 监听fileId变化，重新初始化
  useEffect(() => {
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 在创建新播放器之前清理所有现有播放器
    cleanupAllPlayers();
    
    // 清空容器内容
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
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
    
    // 初始化播放器函数
    const initPlayer = () => {
      if (!window.TCPlayer || !containerRef.current) return;
      
      try {
        // 确保DOM已就绪
        const videoElement = document.getElementById(playerId);
        if (!videoElement) return;
        
        // 初始化播放器 - 使用腾讯推荐的配置
        playerRef.current = window.TCPlayer(playerId, {
          fileID: String(fileId),
          appID: String(appId),
          psign: typeof psign === 'string' ? psign : '',
          autoplay: true,
          controls: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          poster: { style: "cover", src: "" }
        });
        
        // 监听基本事件
        if (playerRef.current) {
          playerRef.current.on('error', (err: any) => {
            console.error('播放器错误:', err);
          });
        }
      } catch (err) {
        console.error('播放器初始化错误:', err);
      }
    };
    
    // 加载腾讯云播放器
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
        
        script.onload = () => {
          initPlayer();
        };
        
        document.head.appendChild(script);
      } else {
        // 脚本已存在但可能尚未加载完成，定期检查
        const checkTCPlayer = setInterval(() => {
          if (typeof window.TCPlayer === 'function') {
            clearInterval(checkTCPlayer);
            initPlayer();
          }
        }, 100);
        
        // 最多等待5秒
        setTimeout(() => {
          clearInterval(checkTCPlayer);
        }, 5000);
      }
    }
    
    // 组件卸载时清理
    return () => {
      console.log("组件卸载，清理播放器:", fileId);
      cleanupAllPlayers();
    };
  }, [fileId, appId, psign]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}