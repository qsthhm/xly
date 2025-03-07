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
  const [playerReady, setPlayerReady] = useState(false);

  // 当fileId变化时重新加载视频
  useEffect(() => {
    if (!scriptLoaded || !fileId) return;
    
    // 如果播放器实例已存在，并且fileId改变，直接切换视频
    if (playerInstanceRef.current && playerReady) {
      try {
        // 使用loadVideoByID方法更换视频
        playerInstanceRef.current.loadVideoByID({
          fileID: fileId,
          appID: appId,
          psign: psign,
        });
      } catch (error: unknown) {
        console.error('切换视频错误:', error);
      }
      return;
    }
    
    // 如果播放器还未初始化，创建新的播放器实例
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.TCPlayer && document.getElementById('player-container-id')) {
        try {
          if (playerInstanceRef.current) {
            playerInstanceRef.current.dispose();
            playerInstanceRef.current = null;
          }
          
          // 初始化播放器，添加自动播放
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true, // 启用自动播放
            controls: true,
            plugins: {
              ContinuePlay: {
                auto: false,
              },
            },
            language: 'zh-CN',
          });
          
          // 添加事件监听
          playerInstanceRef.current.on('error', function(error: unknown) {
            console.error('播放器错误详情:', error);
          });
          
          playerInstanceRef.current.on('load', function() {
            console.log('视频加载成功');
            setPlayerReady(true);
          });
        } catch (error: unknown) {
          console.error('播放器初始化错误:', error);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [fileId, appId, psign, scriptLoaded]);

  // 组件卸载时清理播放器
  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e: unknown) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, []);

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