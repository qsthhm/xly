'use client';

import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
  psign?: string;
  category?: string;
  views?: string;
  uploadTime?: string;
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
      {/* 分类切换栏 */}
      <div className="sticky top-0 z-10 bg-gray-800/95 backdrop-blur-sm px-4 py-3 border-b border-gray-700 flex space-x-3 overflow-x-auto">
        <button 
          className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
            currentCategory === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          onClick={() => onCategoryChange('all')}
        >
          全部
        </button>
        <button 
          className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
            currentCategory === 'packaging' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          onClick={() => onCategoryChange('packaging')}
        >
          包装项目
        </button>
        <button 
          className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
            currentCategory === 'editing' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          onClick={() => onCategoryChange('editing')}
        >
          剪辑项目
        </button>
      </div>
      
      {/* 视频列表 */}
      <div className="py-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex cursor-pointer p-2 rounded-lg transition-colors ${
              video.id === currentVideoId 
                ? 'bg-gray-700' 
                : 'hover:bg-gray-700/50'
            }`}
            onClick={() => onSelectVideo(video.id)}
          >
            <div className="relative w-40 h-22 flex-shrink-0 rounded-lg overflow-hidden">
              {/* 占位图或实际缩略图 */}
              <div className="absolute inset-0 bg-gray-600 animate-pulse"></div>
              
              {/* 如果有真实缩略图，取消下面注释 */}
              {/* <Image
                src={video.thumbnail}
                alt={video.title}
                width={160}
                height={90}
                className="object-cover"
                loading="lazy"
              /> */}
              
              {/* 视频时长指示器 */}
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                3:45
              </div>
            </div>
            
            <div className="ml-3 flex-grow overflow-hidden">
              <h3 className="text-sm font-medium line-clamp-2 mb-1">{video.title}</h3>
              <div className="flex flex-col space-y-1">
                <p className="text-xs text-gray-400 truncate">许璨雅</p>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{video.views || "1.2万次观看"}</span>
                  <span className="mx-1">•</span>
                  <span>{video.uploadTime || "3个月前"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
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