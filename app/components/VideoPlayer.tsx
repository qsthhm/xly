'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
}

export default function VideoPlayer({ fileId, appId }: VideoPlayerProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);

  useEffect(() => {
    // 当fileId改变时，更新播放内容
    if (window.TCPlayer && playerContainerRef.current) {
      if (playerInstanceRef.current) {
        // 如果播放器已经初始化，直接更换视频
        playerInstanceRef.current.loadVideoByID({ fileID: fileId, appID: appId });
      } else {
        // 初始化播放器
        playerInstanceRef.current = new window.TCPlayer('player-container', {
          fileID: fileId,
          appID: appId,
          // 可以添加更多腾讯云播放器配置
          poster: '',  // 封面图
          autoplay: false,
          plugins: {
            ContinuePlay: {
              auto: false,
            },
          },
        });
      }
    }

    // 组件卸载时清理播放器
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.dispose();
        playerInstanceRef.current = null;
      }
    };
  }, [fileId, appId]);

  return (
    <div className="relative w-full aspect-video bg-black">
      {/* 腾讯云VOD播放器脚本 */}
      <Script
        src="https://web.sdk.qcloud.com/player/tcplayer/release/v4.7.2/tcplayer.v4.7.2.min.js"
        strategy="beforeInteractive"
      />
      <div id="player-container" ref={playerContainerRef} className="w-full h-full"></div>
    </div>
  );
}