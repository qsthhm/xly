'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const playerInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !fileId) return;
    
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.TCPlayer && document.getElementById('player-container-id')) {
        try {
          if (playerInstanceRef.current) {
            playerInstanceRef.current.dispose();
            playerInstanceRef.current = null;
          }
          
          // 初始化播放器
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: false
          });
          
          // 添加事件监听帮助调试
          playerInstanceRef.current.on('error', function(error: unknown) {
            console.error('播放器错误详情:', error);
          });
          
          playerInstanceRef.current.on('load', function() {
            console.log('视频加载成功');
          });
        } catch (error: unknown) {
          console.error('播放器初始化错误:', error);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e: unknown) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, [fileId, appId, psign, scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black">
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      <video 
        id="player-container-id" 
        className="w-full h-full" 
        preload="auto"
        playsInline 
      ></video>
    </div>
  );
}