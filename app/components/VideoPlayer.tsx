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
  const playerInitializedRef = useRef<boolean>(false);
  
  // 清理播放器 - 简化版本
  const cleanupPlayer = () => {
    if (!playerRef.current) return;
    
    try {
      // 尝试使用内置方法销毁播放器
      if (typeof playerRef.current.dispose === 'function') {
        playerRef.current.dispose();
      }
    } catch (e) {
      console.error('播放器销毁错误:', e);
    }
    
    // 重置引用
    playerRef.current = null;
    playerInitializedRef.current = false;
    
    // 清理全局播放器数组
    if (window.__tcplayers?.length) {
      window.__tcplayers = [];
    }
  };
  
  // 安全地尝试播放视频
  const safePlayVideo = () => {
    if (!playerRef.current || !playerInitializedRef.current) return;
    
    try {
      if (typeof playerRef.current.play === 'function') {
        playerRef.current.play();
      }
    } catch (err) {
      console.warn('播放器播放失败，这可能是正常的:', err);
    }
  };
  
  // 监听fileId变化，重新初始化
  useEffect(() => {
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 先清理现有播放器
    cleanupPlayer();
    
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
    
    // 初始化播放器的函数
    const initPlayer = () => {
      if (!window.TCPlayer) return;
      
      try {
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
        
        if (playerRef.current) {
          playerInitializedRef.current = true;
          
          // 监听事件
          playerRef.current.on('error', (err: any) => {
            console.error('播放器错误:', err);
          });
          
          // 确保播放器已准备好后再播放
          playerRef.current.on('loadedmetadata', () => {
            safePlayVideo();
          });
        }
      } catch (err) {
        console.error('播放器初始化错误:', err);
        playerInitializedRef.current = false;
      }
    };
    
    // 如果TCPlayer已加载，直接初始化
    if (typeof window.TCPlayer === 'function') {
      initPlayer();
      return;
    }
    
    // TCPlayer未加载，检查是否已有脚本标签
    const scriptId = 'tcplayer-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      // 如果没有脚本标签，创建一个
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
      script.onload = initPlayer;
      document.head.appendChild(script);
    } else {
      // 脚本标签存在但可能未加载完成，定期检查
      const checkTCPlayer = setInterval(() => {
        if (typeof window.TCPlayer === 'function') {
          clearInterval(checkTCPlayer);
          initPlayer();
        }
      }, 100);
      
      // 最多等待5秒
      setTimeout(() => clearInterval(checkTCPlayer), 5000);
    }
    
    // 组件卸载时清理
    return cleanupPlayer;
  }, [fileId, appId, psign]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}