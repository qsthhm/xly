'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VideoPlayerProps {
  fileId: string;
  appId: string;
  psign?: string;
}

export default function VideoPlayer({ fileId, appId, psign = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // 清理旧播放器并创建新播放器
  const recreatePlayer = () => {
    // 重置状态
    setIsLoading(true);
    setVideoLoaded(false);
    setError(null);
    
    // 移除所有现有视频元素
    if (containerRef.current) {
      // 清理旧的播放器实例
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.dispose();
        } catch (e) {
          console.error('播放器销毁错误:', e);
        }
        playerInstanceRef.current = null;
      }
      
      // 清空容器
      containerRef.current.innerHTML = '';
      
      // 创建新的video元素
      const videoElement = document.createElement('video');
      videoElement.id = 'player-container-id';
      videoElement.className = 'w-full h-full';
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('playsinline', '');
      
      // 在加载阶段设置背景色
      if (!videoLoaded) {
        videoElement.style.backgroundColor = '#141414';
      }
      
      containerRef.current.appendChild(videoElement);
      
      // 初始化播放器
      if (typeof window.TCPlayer === 'function') {
        try {
          playerInstanceRef.current = window.TCPlayer('player-container-id', {
            fileID: fileId,
            appID: appId,
            psign: psign,
            autoplay: true
          });
          
          // 监听播放器事件
          playerInstanceRef.current.on('error', (err: any) => {
            console.error('播放器错误:', err);
            setError('视频加载失败，请稍后再试');
            setIsLoading(false);
          });
          
          // 监听播放器准备就绪事件
          playerInstanceRef.current.on('ready', () => {
            setIsLoading(false);
          });
          
          // 监听播放开始事件
          playerInstanceRef.current.on('playing', () => {
            console.log('Video playing, removing background');
            setVideoLoaded(true);
            setIsLoading(false);
            
            // 视频开始播放后移除背景色
            setTimeout(() => {
              if (videoElement) {
                videoElement.style.backgroundColor = 'transparent';
              }
              
              // 寻找并移除其他播放器元素的背景色
              try {
                const playerElements = document.querySelectorAll('.vcp-player, .vcp-player .vcp-poster, .vcp-player .vcp-loading');
                playerElements.forEach(el => {
                  (el as HTMLElement).style.backgroundColor = 'transparent';
                });
              } catch (e) {
                console.error('移除背景色错误:', e);
              }
            }, 500); // 延迟半秒以确保视频内容已显示
          });
          
          // 监听时间更新事件
          playerInstanceRef.current.on('timeupdate', () => {
            if (isLoading) {
              setIsLoading(false);
            }
            
            // 确保视频播放时移除背景色
            if (!videoLoaded) {
              setVideoLoaded(true);
              
              // 视频播放时移除背景色
              setTimeout(() => {
                if (videoElement) {
                  videoElement.style.backgroundColor = 'transparent';
                }
                
                // 寻找并移除其他播放器元素的背景色
                try {
                  const playerElements = document.querySelectorAll('.vcp-player, .vcp-player .vcp-poster, .vcp-player .vcp-loading');
                  playerElements.forEach(el => {
                    (el as HTMLElement).style.backgroundColor = 'transparent';
                  });
                } catch (e) {
                  console.error('移除背景色错误:', e);
                }
              }, 200);
            }
          });
          
        } catch (error) {
          console.error('播放器初始化错误:', error);
          setError('播放器初始化失败');
          setIsLoading(false);
        }
      }
    }
  };

  // 脚本加载完成时
  useEffect(() => {
    if (scriptLoaded && fileId) {
      // 延迟一点初始化，确保DOM和播放器脚本都准备好
      const timer = setTimeout(() => {
        recreatePlayer();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scriptLoaded, fileId, appId, psign]);

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

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden ${isLoading || !videoLoaded ? 'bg-[#141414] dark:bg-[#141414]' : 'bg-transparent'}`}>
      <Script
        src="https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {/* 加载状态 - 简化为单个转圈动画 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] dark:bg-[#141414] z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#202020]/30 border-t-[#C15F3C] rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* 错误状态 - 保持简洁 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#141414] z-10">
          <div className="bg-[#202020] p-5 rounded-lg max-w-xs text-center">
            <p className="text-gray-200 mb-4">{error}</p>
            <button 
              onClick={recreatePlayer}
              className="px-4 py-2 bg-[#C15F3C] text-white text-sm rounded-lg hover:bg-[#A94F32] transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      )}
      
      {/* 播放器容器 - 根据加载状态动态设置背景 */}
      <div 
        ref={containerRef} 
        className={`w-full h-full ${isLoading || !videoLoaded ? 'bg-[#141414] dark:bg-[#141414]' : 'bg-transparent'}`}
        style={{ backgroundColor: isLoading || !videoLoaded ? '#141414' : 'transparent' }}
      ></div>
    </div>
  );
}