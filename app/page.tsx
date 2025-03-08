'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

// 添加接口定义视频数据类型
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  psign: string;
  category: string;
  views: string;
  uploadTime: string;
}

// 视频数据
const ALL_VIDEOS: Video[] = [
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
  {
    id: '第二个视频ID', 
    title: '南川播种一年级自然工作坊',
    thumbnail: '/thumbnails/video2.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'packaging',
    views: '1.8万次观看',
    uploadTime: '3个月前'
  },
  {
    id: '第三个视频ID', 
    title: '剪辑作品1',
    thumbnail: '/thumbnails/video3.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing',
    views: '5.4万次观看',
    uploadTime: '1个月前'
  },
  {
    id: '第四个视频ID', 
    title: '剪辑作品2',
    thumbnail: '/thumbnails/video4.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing',
    views: '2.7万次观看',
    uploadTime: '5个月前'
  },
  {
    id: '第五个视频ID', 
    title: '其他作品',
    thumbnail: '/thumbnails/video5.jpg',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'other',
    views: '1.2万次观看',
    uploadTime: '4个月前'
  }
];

// 腾讯云VOD应用ID
const TENCENT_APP_ID = '1310364790';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 从URL获取视频ID和分类
  const videoIdFromUrl = searchParams.get('v');
  const categoryFromUrl = searchParams.get('category');
  
  // 默认使用URL中的视频ID和分类，如果没有则使用默认值
  const [currentVideoId, setCurrentVideoId] = useState<string>(ALL_VIDEOS[0].id);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  
  // 在组件挂载时，从URL读取视频ID和分类
  useEffect(() => {
    if (videoIdFromUrl) {
      // 检查URL中的视频ID是否存在于视频列表中
      const videoExists = ALL_VIDEOS.some(v => v.id === videoIdFromUrl);
      if (videoExists) {
        setCurrentVideoId(videoIdFromUrl);
      }
    }
    
    if (categoryFromUrl && ['all', 'packaging', 'editing', 'other'].includes(categoryFromUrl)) {
      setCurrentCategory(categoryFromUrl);
    }
  }, [videoIdFromUrl, categoryFromUrl]);
  
  // 根据当前分类筛选视频
  const filteredVideos = currentCategory === 'all' 
    ? ALL_VIDEOS 
    : ALL_VIDEOS.filter(video => video.category === currentCategory);
  
  // 获取当前视频
  const currentVideo = ALL_VIDEOS.find(v => v.id === currentVideoId) || ALL_VIDEOS[0];
  
  // 处理视频选择
  const handleSelectVideo = (id: string) => {
    setCurrentVideoId(id);
    
    // 更新URL，保留当前分类
    router.push(`?v=${id}&category=${currentCategory}`);
  };
  
  // 修改分类切换处理函数，不自动切换视频
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    // 更新URL，保留当前视频ID
    router.push(`?v=${currentVideoId}&category=${category}`);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* YouTube风格的顶部导航栏 */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">许璨雅 个人作品集</span>
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentVideo?.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700 dark:text-gray-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">许璨雅</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">个人作品集</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{currentVideo?.views}</span>
                  <span>•</span>
                  <span>{currentVideo?.uploadTime}</span>
                </div>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{currentVideo?.description}</p>
              </div>
            </div>
          </div>
          
          {/* 右侧视频列表 */}
          <div className="w-full lg:w-1/3 rounded-xl bg-white dark:bg-gray-800 overflow-y-auto shadow-sm" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <VideoList
              videos={filteredVideos}
              currentVideoId={currentVideo?.id || ''}
              onSelectVideo={handleSelectVideo}
              currentCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}