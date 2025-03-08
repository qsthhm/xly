'use client';

import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
  psign?: string;
  category?: string;
  tag: string;
}

interface VideoListProps {
  videos: Video[];
  currentVideoId: string;
  onSelectVideo: (id: string) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function VideoList({ 
  videos, 
  currentVideoId, 
  onSelectVideo,
  currentCategory,
  onCategoryChange
}: VideoListProps) {

  return (
    <div className="w-full flex flex-col">
      {/* 标题栏 - 左侧标题，右侧分类 - 更新深色模式颜色 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#202020] px-4 py-3 border-b border-gray-200 dark:border-[#4C4C4C] flex justify-between items-center">
        <span className="font-medium text-base text-gray-900 dark:text-gray-200">播放列表</span>
        {/* 分类切换按钮 - 更新深色模式颜色 */}
        <div className="flex gap-3">
          <button 
            className={`text-sm pb-[13px] border-b-3 -mb-[15px] transition-colors ${
              currentCategory === 'all' 
                ? 'text-[#C15F3C] dark:text-gray-200 border-[#C15F3C] dark:border-gray-200' 
                : 'hover:text-[#C15F3C] border-transparent text-gray-800 dark:text-[#8A8A8A] dark:hover:text-gray-200'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            全部
          </button>
          <button 
            className={`text-sm pb-[13px] border-b-3 -mb-[15px] transition-colors ${
              currentCategory === 'packaging' 
                ? 'text-[#C15F3C] dark:text-gray-200 border-[#C15F3C] dark:border-gray-200' 
                : 'hover:text-[#C15F3C] border-transparent text-gray-800 dark:text-[#8A8A8A] dark:hover:text-gray-200'
            }`}
            onClick={() => onCategoryChange('packaging')}
          >
            包装
          </button>
          <button 
            className={`text-sm pb-[13px] border-b-3 -mb-[15px] transition-colors ${
              currentCategory === 'editing' 
                ? 'text-[#C15F3C] dark:text-gray-200 border-[#C15F3C] dark:border-gray-200' 
                : 'hover:text-[#C15F3C] border-transparent text-gray-800 dark:text-[#8A8A8A] dark:hover:text-gray-200'
            }`}
            onClick={() => onCategoryChange('editing')}
          >
            剪辑
          </button>
        </div>
      </div>
      
      {/* 视频列表 - 更新深色模式颜色 */}
      <div className="py-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex items-center cursor-pointer p-2.5 transition-colors ${
              video.id === currentVideoId 
                ? 'bg-[#C15F3C]/10 dark:bg-[#373737] border-l-4 border-[#C15F3C] dark:border-gray-200' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/70 border-l-4 border-transparent'
            }`}
            onClick={() => onSelectVideo(video.id)}
          >
            {/* 缩略图容器 - 调整小屏幕尺寸更统一 */}
            <div className="relative w-32 sm:w-32 md:w-[22%] lg:w-24 flex-shrink-0 rounded-lg overflow-hidden aspect-video">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1200px) 22vw, 96px"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C2sgAAAABJRU5ErkJggg=="
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-pulse"></div>
              )}
              
              {/* 视频时长指示器 */}
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                3:45
              </div>
            </div>
            
            {/* 文字区域 - 垂直居中，根据屏幕宽度调整字号 */}
            <div className="ml-2.5 flex-grow min-w-0 flex items-center">
              <div className="flex flex-col">
                <h3 className={`text-base lg:text-base xl:text-base font-medium line-clamp-2 ${video.id === currentVideoId ? 'text-[#C15F3C] dark:text-gray-200' : 'text-gray-900 dark:text-gray-200'}`}>
                  {video.title}
                </h3>
                
                {/* 使用视频的自定义标签 */}
                <div style={{ marginTop: '2px' }}>
                  <span className="text-sm lg:text-xs xl:text-sm text-gray-500 dark:text-gray-400">
                    {video.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
            </svg>
            <p className="text-sm">此分类下暂无视频</p>
          </div>
        )}
      </div>
    </div>
  );
}