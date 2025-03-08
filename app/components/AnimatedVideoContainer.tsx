'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoSkeletonLoader from './VideoSkeletonLoader';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  psign?: string;
  category: string;
}

interface AnimatedVideoContainerProps {
  video: Video;
  appId: string;
}

export default function AnimatedVideoContainer({ video, appId }: AnimatedVideoContainerProps) {
  const [currentVideo, setCurrentVideo] = useState<Video>(video);
  const [previousVideo, setPreviousVideo] = useState<Video | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // 当视频ID变化时，开始过渡动画
    if (video.id !== currentVideo.id) {
      setPreviousVideo(currentVideo);
      setCurrentVideo(video);
      setIsTransitioning(true);
      
      // 400ms 后结束过渡动画，与 CSS 过渡时长匹配
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousVideo(null);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [video, currentVideo]);
  
  return (
    <div className="relative w-full">
      {/* 当前视频 */}
      <div 
        className={`w-full transition-opacity duration-400 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <VideoPlayer 
          fileId={currentVideo.id} 
          appId={appId}
          psign={currentVideo.psign || ''}
        />
      </div>
      
      {/* 前一个视频 (用于过渡) */}
      {isTransitioning && previousVideo && (
        <div 
          className="absolute inset-0 transition-opacity duration-400 ease-in-out opacity-100"
        >
          <VideoPlayer 
            fileId={previousVideo.id} 
            appId={appId}
            psign={previousVideo.psign || ''}
          />
        </div>
      )}
    </div>
  );
}