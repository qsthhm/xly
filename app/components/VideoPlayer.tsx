'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
}

export default function VideoPlayer({ fileId, appId }: VideoPlayerProps) {
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
          
          // 使用与自动生成代码相同的初始化方式，但添加window前缀
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjgwMTU4NzgyOSIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDEzMzU5NDIsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiT3JpZ2luYWwifSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.d2UMx_1i5ALIUPT5PDmGAAbNrA-yynCego0zCjOjZB4", // 这个参数可能是必需的，即使是空值
            autoplay: false
          });
          
          // 添加事件监听帮助调试，添加类型注解
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
  }, [fileId, appId, scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black">
      {/* 使用与自动生成代码相同的播放器脚本 */}
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 完全按照自动生成的代码设置video标签 */}
      <video 
        id="player-container-id" 
        className="w-full h-full" 
        preload="auto"
        playsInline 
      ></video>
    </div>
  );
}