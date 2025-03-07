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
    
    // 确保TCPlayer已定义且DOM元素已存在
    if (typeof window !== 'undefined' && window.TCPlayer && playerContainerRef.current) {
      try {
        if (playerInstanceRef.current) {
          // 如果播放器已经初始化，直接更换视频
          playerInstanceRef.current.loadVideoByID({ fileID: fileId, appID: appId });
        } else {
          // 初始化播放器
          playerInstanceRef.current = new window.TCPlayer('player-container', {
            fileID: fileId,
            appID: appId,
            poster: '',
            autoplay: false,
            plugins: {
              ContinuePlay: {
                auto: false,
              },
            },
          });
        }
      } catch (error) {
        console.error('播放器初始化错误:', error);
      }
    }

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
  }, [fileId, appId, scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black">
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.7.2/tcplayer.v4.7.2.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div id="player-container" ref={playerContainerRef} className="w-full h-full"></div>
    </div>
  );
}