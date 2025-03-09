'use client';

import { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import VideoSkeletonLoader from './components/VideoSkeletonLoader';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import ContactModal from './components/ContactModal';
import Navigation from './components/Navigation';

// 视频数据类型
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  psign: string;
  category: string;
  tag: string;
}

// 视频数据
const ALL_VIDEOS: Video[] = [
  {
    id: '1397757906803886577', 
    title: '个人介绍',
    thumbnail: '/img/01.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjgwMzg4NjU3NyIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDE0Mjc5OTUsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiT3JpZ2luYWwiLCJpbWFnZVNwcml0ZURlZmluaXRpb24iOjEwfSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.68gBjZa3oQwO3hxEtVcoYVTEfGhFfk6BhuN_3iteZ8w', 
    category: 'packaging',
    tag: '#了解我'
  },
  {
    id: '1397757906318451154', 
    title: '许璐雅包装作品集',
    thumbnail: '/img/02.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjMxODQ1MTE1NCIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDE0MjQ3ODYsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiT3JpZ2luYWwiLCJpbWFnZVNwcml0ZURlZmluaXRpb24iOjEwfSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.tOgcpWDNrGHEuPr_qiuleOIktZwznrwYOMUmUXretpI',
    category: 'packaging',
    tag: '#地产 #特效'
  },
  {
    id: '1397757906314451130', 
    title: '许璐雅水墨作品',
    thumbnail: '/img/03.png',
    description: '我是谁 我擅长什么 我能做什么',
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMxMDM2NDc5MCwiZmlsZUlkIjoiMTM5Nzc1NzkwNjMxNDQ1MTEzMCIsImN1cnJlbnRUaW1lU3RhbXAiOjE3NDE0MjcwNjcsImNvbnRlbnRJbmZvIjp7ImF1ZGlvVmlkZW9UeXBlIjoiT3JpZ2luYWwiLCJpbWFnZVNwcml0ZURlZmluaXRpb24iOjEwfSwidXJsQWNjZXNzSW5mbyI6eyJkb21haW4iOiIxMzEwMzY0NzkwLnZvZC1xY2xvdWQuY29tIiwic2NoZW1lIjoiSFRUUFMifX0.eqH2_D1-en-iKQpKgNkDvGza6Z4mlQYxDm2QhWmxVnE',
    category: 'editing',
    tag: '#展馆 #水墨'
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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // 从URL获取初始参数
  useEffect(() => {
    try {
      // 在客户端运行时从URL获取参数
      const url = new URL(window.location.href);
      const videoId = url.searchParams.get('v');
      
      if (videoId) {
        // 检查URL中的视频ID是否存在于视频列表中
        const videoExists = ALL_VIDEOS.some(v => v.id === videoId);
        if (videoExists) {
          setCurrentVideoId(videoId);
        }
      }
    } catch (error) {
      console.error('初始化参数错误:', error);
    } finally {
      // 初始化完成后关闭加载状态
      setIsLoading(false);
    }
  }, []);
  
  // 使用useMemo缓存筛选结果，避免不必要的重新渲染
  const filteredVideos = useMemo(() => 
    currentCategory === 'all' 
      ? ALL_VIDEOS 
      : ALL_VIDEOS.filter(video => video.category === currentCategory),
    [currentCategory]
  );
  
  // 获取当前视频
  const currentVideo = useMemo(() => 
    ALL_VIDEOS.find(v => v.id === currentVideoId) || ALL_VIDEOS[0],
    [currentVideoId]
  );
  
  // 处理视频选择 - 恢复原始逻辑
  const handleSelectVideo = useCallback((id: string) => {
    setCurrentVideoId(id);
    
    // 更新URL，但不包含分类参数
    router.push(`?v=${id}`, { scroll: false });
  }, [router]);
  
  // 修改分类切换处理函数，不改变URL
  const handleCategoryChange = useCallback((category: string) => {
    setCurrentCategory(category);
  }, []);
  
  // 处理联系按钮点击
  const handleContactClick = useCallback(() => {
    setContactModalOpen(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] text-gray-900 dark:text-gray-200">
      <Navigation onContactClick={handleContactClick} />

      {/* 添加底部间距 */}
      <div className="container mx-auto px-4 pt-3 pb-10">
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          {/* 视频播放区域 */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <VideoSkeletonLoader />
            ) : (
              <>
                <div className="rounded-xl overflow-hidden">
                  <VideoPlayer 
                    fileId={currentVideo.id} 
                    appId={TENCENT_APP_ID}
                    psign={currentVideo.psign || ''}
                  />
                </div>
                
                <div className="mt-5">
                  {/* 视频标题 */}
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200">{currentVideo?.title}</h1>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <span>{currentVideo.tag}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* 右侧视频列表 */}
          <div className="w-full lg:w-1/4 rounded-xl bg-white dark:bg-[#202020] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
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
      
      {/* 联系人弹窗 */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </main>
  );
}

// 主页面组件
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] flex items-center justify-center">
        {/* 极简的网站加载骨架屏 */}
        <div className="container mx-auto px-4">
          {/* 顶部导航骨架 */}
          <div className="w-full h-12 mb-6"></div>
          
          {/* 内容区骨架屏 */}
          <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-3/4">
              {/* 使用骨架屏组件 */}
              <VideoSkeletonLoader />
            </div>
            
            {/* 右侧列表骨架 */}
            <div className="w-full lg:w-1/4 rounded-xl bg-[#DEDCD1] dark:bg-[#202020] h-64"></div>
          </div>
        </div>
      </div>
    }>
      <ClientPage />
    </Suspense>
  );
}