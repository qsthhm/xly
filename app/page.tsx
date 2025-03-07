'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';

// 示例视频数据
const DEMO_VIDEOS = [
  {
    id: '1397757906801587829',
    title: '测试一下',
    thumbnail: '/thumbnails/video1.jpg',
    description: '我是谁 我擅长什么 我能做什么',
  },
  // 其他视频...
];

// 腾讯云VOD应用ID
const TENCENT_APP_ID = '1310364790';

export default function Home() {
  // 使用 useState 但延迟初始化，避免服务器端和客户端不匹配
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // 使用 useEffect 确保只在客户端渲染后设置初始状态
  useEffect(() => {
    setIsClient(true);
    setCurrentVideoId(DEMO_VIDEOS[0].id);
  }, []);
  
  // 如果还没有在客户端渲染，返回一个加载状态
  if (!isClient) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div>加载中...</div>
      </main>
    );
  }
  
  const currentVideo = DEMO_VIDEOS.find(v => v.id === currentVideoId) || DEMO_VIDEOS[0];

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            <h1 className="text-xl font-bold">许璨雅 个人作品集</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm">我的简历</a>
            <a href="#" className="text-sm">联系我</a>
          </div>
        </header>
        
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-2/3">
            {currentVideoId && (
              <VideoPlayer fileId={currentVideoId} appId={TENCENT_APP_ID} />
            )}
            
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span className="mr-2">#个人介绍</span>
                <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">HD</span>
              </div>
              <h2 className="text-xl font-bold mb-2">这是第一个视频的描述</h2>
              <p className="text-sm text-gray-300">如果你想了解更多，那就观看这个视频吧</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 bg-gray-900 rounded-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <VideoList
              videos={DEMO_VIDEOS}
              currentVideoId={currentVideoId || ''}
              onSelectVideo={setCurrentVideoId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}