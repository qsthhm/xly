'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const playerIdRef = useRef(`player-${Math.random().toString(36).substring(2, 9)}`);

  // 初始化或重新创建播放器
  const initializePlayer = () => {
    if (!scriptLoaded || !fileId || !videoRef.current) return;
    
    try {
      // 每次都完全销毁并重新创建播放器，避免切换问题
      if (playerInstanceRef.current) {
        playerInstanceRef.current.dispose();
        playerInstanceRef.current = null;
      }
      
      // 确保DOM元素准备好
      if (videoRef.current && typeof window.TCPlayer === 'function') {
        console.log('初始化播放器：', fileId);
        
        playerInstanceRef.current = new window.TCPlayer(videoRef.current, {
          fileID: fileId,
          appID: appId,
          psign: psign,
          autoplay: true,
          controls: true,
          plugins: {
            ContinuePlay: { auto: false },
          },
          language: 'zh-CN',
          // 禁用动态创建video元素，因为我们已经提供了一个
          createVideoElement: false
        });
        
        console.log('播放器初始化完成');
      }
    } catch (error) {
      console.error('播放器初始化错误:', error);
    }
  };

  // 处理脚本加载
  const handleScriptLoad = () => {
    console.log('播放器脚本加载完成');
    setScriptLoaded(true);
  };

  // 监听脚本加载完成
  useEffect(() => {
    if (scriptLoaded) {
      // 给页面一些时间确保DOM完全准备好
      const timer = setTimeout(() => {
        initializePlayer();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scriptLoaded]);

  // 当fileId变化时重新初始化播放器
  useEffect(() => {
    if (!scriptLoaded) return;
    
    // 重新初始化播放器
    const timer = setTimeout(() => {
      initializePlayer();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [fileId, appId, psign]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black">
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.5.2/tcplayer.v4.5.2.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      <video 
        ref={videoRef}
        id={playerIdRef.current}
        className="w-full h-full" 
        preload="auto"
        playsInline
        muted // 添加muted属性有助于某些浏览器自动播放
      ></video>
    </div>
  );
}