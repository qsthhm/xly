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
      if (typeof window !== 'undefined' && window.TCPlayer && document.getElementById('player-video-element')) {
        try {
          if (playerInstanceRef.current) {
            playerInstanceRef.current.dispose();
            playerInstanceRef.current = null;
          }
          
          // 使用video元素ID初始化播放器
          playerInstanceRef.current = new window.TCPlayer('player-video-element', {
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
            language: 'zh-CN',
            volume: 0.5,
          });
        } catch (error) {
          console.error('播放器初始化错误:', error);
        }
      }
    }, 1000);

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
      
      {/* 重要: 这里我们显式地放置一个video元素，并使用video元素的ID而不是容器ID */}
      <div ref={playerContainerRef} className="w-full h-full">
        <video 
          id="player-video-element" 
          className="tcplayer w-full h-full" 
          playsInline
        ></video>
      </div>
    </div>
  );
}