'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';

// 动态导入主题切换组件，不使用SSR
const ThemeToggle = dynamic(() => import('./components/ThemeToggle'), {
  ssr: false,
  loading: () => (
    <button className="flex items-center justify-center w-9 h-9 rounded-full">
      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </button>
  )
});

// 视频数据
const ALL_VIDEOS = [
  // 你的视频数据保持不变
];

// 腾讯云VOD应用ID
const TENCENT_APP_ID = '1310364790';

export default function Home() {
  const [currentVideoId, setCurrentVideoId] = useState(ALL_VIDEOS[0].id);
  const [currentCategory, setCurrentCategory] = useState('all');
  
  // 逻辑保持不变
  const filteredVideos = currentCategory === 'all' 
    ? ALL_VIDEOS 
    : ALL_VIDEOS.filter(video => video.category === currentCategory);
  
  const currentVideo = ALL_VIDEOS.find(v => v.id === currentVideoId) || ALL_VIDEOS[0];
  
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    const videosInCategory = category === 'all' 
      ? ALL_VIDEOS 
      : ALL_VIDEOS.filter(video => video.category === category);
    
    const currentVideoInCategory = videosInCategory.some(v => v.id === currentVideoId);
    
    if (!currentVideoInCategory && videosInCategory.length > 0) {
      setCurrentVideoId(videosInCategory[0].id);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* YouTube风格的顶部导航栏 */}
      <nav className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-xl font-bold">许璨雅 个人作品集</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          {/* 视频播放区域 */}
          <div className="w-full lg:w-2/3">
            <div className="rounded-xl overflow-hidden shadow-md">
              {currentVideo && (
                <VideoPlayer 
                  fileId={currentVideo.id} 
                  appId={TENCENT_APP_ID}
                  psign={currentVideo.psign || ''}
                />
              )}
            </div>
            
            <div className="mt-4 space-y-4">
              <h1 className="text-2xl font-bold">{currentVideo?.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold">许璨雅</h2>
                    <p className="text-sm text-foreground/60">个人作品集</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl bg-card p-4">
                <div className="flex items-center space-x-2 text-sm text-foreground/70 mb-2">
                  <span>{currentVideo?.views}</span>
                  <span>•</span>
                  <span>{currentVideo?.uploadTime}</span>
                </div>
                <p className="whitespace-pre-line">{currentVideo?.description}</p>
              </div>
            </div>
          </div>
          
          {/* 右侧视频列表 */}
          <div className="w-full lg:w-1/3 rounded-xl bg-card overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <VideoList
              videos={filteredVideos}
              currentVideoId={currentVideo?.id || ''}
              onSelectVideo={setCurrentVideoId}
              currentCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}