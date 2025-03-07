'use client';

import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';

// 视频数据
const ALL_VIDEOS = [
  {
    id: '1397757906801587829', 
    title: 'AI对话式互联计划',
    thumbnail: '/thumbnails/video1.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'packaging',
    views: '3.2万次观看',
    uploadTime: '2个月前'
  },
  // 其他视频保持不变...
];

const TENCENT_APP_ID = '1310364790';

export default function Home() {
  const [currentVideoId, setCurrentVideoId] = useState(ALL_VIDEOS[0].id);
  const [currentCategory, setCurrentCategory] = useState('all');
  
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
    <main className="min-h-screen bg-gray-900 text-white">
      {/* 页面导航栏，但没有主题切换按钮 */}
      <nav className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-xl font-bold">许璨雅 个人作品集</span>
            </div>
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
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold">许璨雅</h2>
                    <p className="text-sm text-gray-400">个人作品集</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl bg-gray-800 p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>{currentVideo?.views}</span>
                  <span>•</span>
                  <span>{currentVideo?.uploadTime}</span>
                </div>
                <p className="whitespace-pre-line">{currentVideo?.description}</p>
              </div>
            </div>
          </div>
          
          {/* 右侧视频列表 */}
          <div className="w-full lg:w-1/3 rounded-xl bg-gray-800 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
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