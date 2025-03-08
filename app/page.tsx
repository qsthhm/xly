'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import VideoSkeletonLoader from './components/VideoSkeletonLoader';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';

// 动态导入主题切换组件
const ThemeToggle = dynamic(() => import('./components/ThemeToggle'), {
  ssr: false,
  loading: () => (
    <button className="flex items-center justify-center w-9 h-9 rounded-full">
      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </button>
  )
});

// 视频数据类型
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  psign: string;
  category: string;
}


// 视频数据
const ALL_VIDEOS: Video[] = [
  {
    id: '1397757906801587829', 
    title: 'AI对话式互联计划',
    thumbnail: '/img/01.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '', 
    category: 'packaging'
  },
  {
    id: '1397757906318451154', 
    title: '许璐雅包装作品集',
    thumbnail: '/img/02.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjMxODQ1MTE1NCIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDE0MjQ3ODYsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiT3JpZ2luYWwiLCJpbWFnZVNwcml0ZURlZmluaXRpb24iOjEwfSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.tOgcpWDNrGHEuPr_qiuleOIktZwznrwYOMUmUXretpI',
    category: 'packaging'
  },
  {
    id: '第三个视频ID', 
    title: '剪辑作品1',
    thumbnail: '/img/03.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: '',
    category: 'editing'
  }
];

// 腾讯云VOD应用ID
const TENCENT_APP_ID = '1310364790';

// 客户端组件，处理URL参数
function ClientPage() {
  const router = useRouter();
  
  // 使用客户端状态
  const [currentVideoId, setCurrentVideoId] = useState<string>(ALL_VIDEOS[0].id);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(0); // 用于强制重新渲染视频播放器
  
  // 从URL获取初始参数
  useEffect(() => {
    // 在客户端运行时从URL获取参数
    const url = new URL(window.location.href);
    const videoId = url.searchParams.get('v');
    const category = url.searchParams.get('category');
    
    if (videoId) {
      // 检查URL中的视频ID是否存在于视频列表中
      const videoExists = ALL_VIDEOS.some(v => v.id === videoId);
      if (videoExists) {
        setCurrentVideoId(videoId);
      }
    }
    
    if (category && ['all', 'packaging', 'editing', 'other'].includes(category)) {
      setCurrentCategory(category);
    }
    
    // 初始化完成后关闭加载状态
    setIsLoading(false);
  }, []);
  
  // 根据当前分类筛选视频
  const filteredVideos = currentCategory === 'all' 
    ? ALL_VIDEOS 
    : ALL_VIDEOS.filter(video => video.category === currentCategory);
  
  // 获取当前视频
  const currentVideo = ALL_VIDEOS.find(v => v.id === currentVideoId) || ALL_VIDEOS[0];
  
  // 处理视频选择
  const handleSelectVideo = (id: string) => {
    if (id !== currentVideoId) {
      setCurrentVideoId(id);
      setVideoKey(prev => prev + 1); // 更改key以强制重新渲染播放器
      
      // 更新URL，保留当前分类
      router.push(`?v=${id}&category=${currentCategory}`, { scroll: false });
    }
  };
  
  // 修改分类切换处理函数，不自动切换视频
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    // 更新URL，保留当前视频ID
    router.push(`?v=${currentVideoId}&category=${category}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#F0EFE7] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* 导航栏 - 移除吸顶效果 */}
      <nav className="bg-[#F0EFE7] dark:bg-gray-900">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src="/img/logo.png" 
                alt="许璐雅头像" 
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-base font-medium text-gray-900 dark:text-gray-200">
              许璐雅 · 个人作品集
            </span>
          </div>
          
          {/* 导航项 */}
          <div className="flex items-center space-x-3">
            <a href="#" className="text-base text-gray-900 dark:text-gray-200 hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors">
              简历
            </a>
            <a href="#" className="text-base text-gray-900 dark:text-gray-200 hover:text-[#C15F3C] dark:hover:text-[#C15F3C] transition-colors">
              联系我
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 添加底部间距 */}
      <div className="container mx-auto px-4 pt-3 pb-10">
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          {/* 视频播放区域 - 直接使用VideoPlayer而不是AnimatedVideoContainer */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <VideoSkeletonLoader />
            ) : (
              <>
                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                  <VideoPlayer 
                    key={videoKey} // 添加key使得切换视频时重新创建播放器组件
                    fileId={currentVideo.id} 
                    appId={TENCENT_APP_ID}
                    psign={currentVideo.psign || ''}
                  />
                </div>
                
                {/* 调整内容顺序：标签、标题、描述 */}
                <div className="mt-5 space-y-4">
                  {/* 视频标签 */}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span>{currentVideo?.category === 'packaging' ? '包装项目' : 
                          currentVideo?.category === 'editing' ? '剪辑项目' : '其他'}</span>
                  </div>
                  
                  {/* 视频标题 */}
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200">{currentVideo?.title}</h1>
                  
                  {/* 视频描述 */}
                  <p className="whitespace-pre-line leading-relaxed text-gray-900 dark:text-gray-300">{currentVideo?.description}</p>
                </div>
              </>
            )}
          </div>
          
          {/* 右侧视频列表 */}
          <div className="w-full lg:w-1/4 rounded-xl bg-white dark:bg-gray-800 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
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

// 主页面组件
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F0EFE7] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C15F3C] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">加载中...</span>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">精彩内容加载中...</p>
        </div>
      </div>
    }>
      <ClientPage />
    </Suspense>
  );
}