'use client';

import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';

// 扩展视频数据结构，包含分类信息
const ALL_VIDEOS = [
  {
    id: '1397757906801587829', 
    title: 'AI对话式互联计划',
    thumbnail: '/thumbnails/video1.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '', // 你的psign，如果有的话
    category: 'packaging' // 包装项目
  },
  {
    id: '第二个视频ID', 
    title: '南川播种一年级自然工作坊',
    thumbnail: '/thumbnails/video2.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'packaging' // 包装项目
  },
  {
    id: '第三个视频ID', 
    title: '剪辑作品1',
    thumbnail: '/thumbnails/video3.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing' // 剪辑项目
  },
  {
    id: '第四个视频ID', 
    title: '剪辑作品2',
    thumbnail: '/thumbnails/video4.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing' // 剪辑项目
  },
  {
    id: '第五个视频ID', 
    title: '其他作品',
    thumbnail: '/thumbnails/video5.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'other' // 其他类别
  }
];

// 腾讯云VOD应用ID
const TENCENT_APP_ID = '1310364790';

export default function Home() {
  const [currentVideoId, setCurrentVideoId] = useState(ALL_VIDEOS[0].id);
  const [currentCategory, setCurrentCategory] = useState('all'); // 默认显示全部
  
  // 根据当前分类筛选视频
  const filteredVideos = currentCategory === 'all' 
    ? ALL_VIDEOS 
    : ALL_VIDEOS.filter(video => video.category === currentCategory);
  
  // 确保在切换分类后，如果当前视频不在新分类中，则自动选择新分类的第一个视频
  const currentVideo = filteredVideos.find(v => v.id === currentVideoId) || filteredVideos[0];
  
  // 当切换分类时，如果当前视频不在该分类中，自动切换到该分类的第一个视频
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    // 检查当前视频是否在新类别中
    const videos = category === 'all' 
      ? ALL_VIDEOS 
      : ALL_VIDEOS.filter(video => video.category === category);
    
    if (videos.length > 0 && !videos.some(v => v.id === currentVideoId)) {
      setCurrentVideoId(videos[0].id);
    }
  };

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
            {currentVideo && (
              <VideoPlayer 
                fileId={currentVideo.id} 
                appId={TENCENT_APP_ID}
                psign={currentVideo.psign || ''}
              />
            )}
            
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span className="mr-2">#个人介绍</span>
                <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">HD</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{currentVideo?.title}</h2>
              <p className="text-sm text-gray-300">{currentVideo?.description}</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 bg-gray-900 rounded-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
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