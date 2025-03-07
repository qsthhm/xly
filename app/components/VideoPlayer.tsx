'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
}

export default function VideoPlayer({ fileId, appId }: VideoPlayerProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !fileId) return;
    
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.TCPlayer && playerContainerRef.current) {
        try {
          if (playerInstanceRef.current) {
            playerInstanceRef.current.dispose();
            playerInstanceRef.current = null;
          }
          
          // 初始化播放器
          playerInstanceRef.current = new window.TCPlayer('player-container', {
            fileID: fileId,
            appID: appId,
            poster: '',
            autoplay: false,
            controls: true,
            plugins: {
              ContinuePlay: {
                auto: false,
              },
            },
            // 添加更多播放器配置，如需要
            language: 'zh-CN', // 设置语言
            volume: 0.5, // 设置音量
          });
        } catch (error) {
          console.error('播放器初始化错误:', error);
        }
      }
    }, 1000); // 给样式和脚本加载一些额外时间

    return () => {
      clearTimeout(timer);
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, [fileId, appId, scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black">
      {/* 播放器脚本 */}
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.7.2/tcplayer.v4.7.2.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 播放器容器 */}
      <div id="player-container" ref={playerContainerRef} className="tcplayer w-full h-full"></div>
    </div>
  );
}