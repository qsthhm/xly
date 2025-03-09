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
  // 移除isLoading状态，使用播放器内置的加载动画
  
  // 清理播放器
  const cleanupPlayer = () => {
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.dispose === 'function') {
          playerRef.current.dispose();
        }
      } catch (e) {
        console.error('播放器销毁错误:', e);
      }
      playerRef.current = null;
    }
    
    // 确保全局播放器数组被清理
    if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
      window.__tcplayers = window.__tcplayers.filter(p => p && p !== playerRef.current);
    }
  };
  
  // 监听fileId变化，重新初始化
  useEffect(() => {
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 先清理现有播放器
    cleanupPlayer();
    
    // 清空容器内容
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // 为视频生成唯一ID
    const playerId = `player-${fileId}-${Math.random().toString(36).substring(2, 9)}`;
    
    // 创建video元素 - 使用与腾讯示例代码相同的属性
    if (containerRef.current) {
      const video = document.createElement('video');
      video.id = playerId;
      video.className = 'w-full h-full';
      video.setAttribute('preload', 'auto');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x5-playsinline', '');
      containerRef.current.appendChild(video);
    }
    
    // 初始化播放器函数
    const initPlayer = () => {
      if (!window.TCPlayer || !containerRef.current) return;
      
      try {
        // 确保DOM已就绪
        const videoElement = document.getElementById(playerId);
        if (!videoElement) return;
        
        // 初始化播放器 - 使用腾讯推荐的配置
        playerRef.current = window.TCPlayer(playerId, {
          fileID: fileId,
          appID: appId,
          psign: psign || '',
          autoplay: true, // 设为true，启用自动播放
          controls: true,  // 启用控件
          playbackRates: [0.5, 1, 1.25, 1.5, 2], // 播放速率选项
          poster: { // 启用封面
            style: "cover",
            src: ""  // 会自动使用视频的第一帧
          }
        });
        
        // 监听基本事件
        if (playerRef.current) {
          // 只监听最基本的事件，不干预播放器行为
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
    </div>
  );
}