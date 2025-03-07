'use client';

import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import ThemeToggle from './components/ThemeToggle';

// 扩展视频数据结构，包含分类信息
const ALL_VIDEOS = [
  {
    id: '1397757906803886577', 
    title: '第一个视频',
    thumbnail: '/thumbnails/video1.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjgwMzg4NjU3NyIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDEzMzcwMzcsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiVHJhbnNjb2RlIiwidHJhbnNjb2RlRGVmaW5pdGlvbiI6MTAwODAwfSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.xzpFTOT7jZDZnp_LremVfx49MKJn8QWB6UU9CI5k46A', // 你的psign，如果有的话
    category: 'packaging', // 包装项目
    views: '3.2万次观看',
    uploadTime: '2个月前'
  },
  {
    id: '第二个视频ID', 
    title: '南川播种一年级自然工作坊',
    thumbnail: '/thumbnails/video2.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'packaging', // 包装项目
    views: '1.8万次观看',
    uploadTime: '3个月前'
  },
  {
    id: '第三个视频ID', 
    title: '剪辑作品1',
    thumbnail: '/thumbnails/video3.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing', // 剪辑项目
    views: '5.4万次观看',
    uploadTime: '1个月前'
  },
  {
    id: '第四个视频ID', 
    title: '剪辑作品2',
    thumbnail: '/thumbnails/video4.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing', // 剪辑项目
    views: '2.7万次观看',
    uploadTime: '5个月前'
  },
  {
    id: '第五个视频ID', 
    title: '其他作品',
    thumbnail: '/thumbnails/video5.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'other', // 其他类别
    views: '1.2万次观看',
    uploadTime: '4个月前'
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
  const currentVideo = ALL_VIDEOS.find(v => v.id === currentVideoId) || ALL_VIDEOS[0];
  
  // 当切换分类时，保持当前视频，除非它不在新分类中
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    // 如果是切换到"全部"分类，保持当前视频不变
    if (category === 'all') {
      return;
    }
    
    // 检查当前视频是否在新分类中
    const videosInCategory = ALL_VIDEOS.filter(video => video.category === category);
    
    // 只有当前视频不在新分类中时，才自动选中第一个视频
    const currentVideoInNewCategory = videosInCategory.some(v => v.id === currentVideoId);
    if (!currentVideoInNewCategory && videosInCategory.length > 0) {
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
            <a href="#" className="yt-nav-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </a>
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
                    <h2 className="font-semibold">许璐雅</h2>
                    <p className="text-sm text-foreground/60">个人作品集</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <a href="#" className="yt-button yt-button-primary">
                    <span>我的简历</span>
                  </a>
                  <a href="#" className="yt-button yt-button-secondary">
                    <span>联系我</span>
                  </a>
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