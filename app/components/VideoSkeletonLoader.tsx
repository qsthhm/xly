'use client';

export default function VideoSkeletonLoader() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      {/* 视频播放器加载状态 */}
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <svg 
            className="w-12 h-12 text-gray-300 dark:text-gray-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
      </div>
      
      {/* 标题加载状态 */}
      <div className="mt-5">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
      
      {/* 描述加载状态 */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}