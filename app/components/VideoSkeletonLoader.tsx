'use client';

import React from 'react';

export default function VideoSkeletonLoader() {
  return (
    <div className="w-full flex flex-col">
      {/* 视频播放器加载状态 - 使用渐变动画 */}
      <div className="w-full aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl overflow-hidden animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine"></div>
        
        <div className="flex items-center justify-center h-full">
          {/* 视频图标 - 添加脉冲效果 */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-[#C15F3C]/20 dark:bg-[#C15F3C]/30 rounded-full animate-ping opacity-75"></div>
            <svg 
              className="w-12 h-12 text-[#C15F3C]/50 dark:text-[#C15F3C]/70 relative z-10" 
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
      </div>
      
      {/* 标题加载状态 - 使用渐变动画 */}
      <div className="mt-5">
        <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine"></div>
        </div>
      </div>
      
      {/* 描述加载状态 - 使用渐变动画并错开时间 */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-1/4 relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: '0.1s' }}></div>
        </div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-5/6 relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
      
      {/* 添加视频列表骨架屏 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-start space-x-2 rounded-lg p-2 relative overflow-hidden" style={{ animationDelay: `${item * 0.1}s` }}>
            {/* 缩略图占位符 */}
            <div className="w-20 h-12 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: `${item * 0.1}s` }}></div>
            </div>
            
            {/* 文字内容占位符 */}
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: `${item * 0.15}s` }}></div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-2/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 skeleton-shine" style={{ animationDelay: `${item * 0.2}s` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}