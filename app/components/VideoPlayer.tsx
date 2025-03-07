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
    
    // 确保script已加载完成后再初始化播放器
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.TCPlayer && playerContainerRef.current) {
        try {
          if (playerInstanceRef.current) {
            playerInstanceRef.current.dispose();
            playerInstanceRef.current = null;
          }
          
          // 确保容器中有video元素
          if (!playerContainerRef.current.querySelector('video')) {
            const videoElement = document.createElement('video');
            videoElement.id = 'player-video-element';
            videoElement.className = 'w-full h-full';
            videoElement.setAttribute('playsinline', 'true');
            playerContainerRef.current.appendChild(videoElement);
          }
          
          // 使用正确的video元素初始化播放器
          playerInstanceRef.current = new window.TCPlayer('player-video-element', {
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
        } catch (error) {
          console.error('播放器初始化错误:', error);
        }
      }
    }, 500); // 给脚本加载一些额外时间

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
      <div id="player-container" ref={playerContainerRef} className="w-full h-full">
        {/* video元素将在useEffect中动态创建 */}
      </div>
    </div>
  );
}