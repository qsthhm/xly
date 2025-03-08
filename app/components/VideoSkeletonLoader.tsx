'use client';

export default function VideoSkeletonLoader() {
  return (
    <div className="w-full flex flex-col">
      {/* 视频播放器骨架屏 - 简化为纯色块 */}
      <div className="w-full aspect-video bg-[#DEDCD1] dark:bg-[#202020] rounded-xl overflow-hidden"></div>
      
      {/* 标题骨架屏 */}
      <div className="mt-5">
        <div className="h-7 bg-[#DEDCD1] dark:bg-[#202020] rounded w-3/4"></div>
      </div>
      
      {/* 标签骨架屏 */}
      <div className="mt-3">
        <div className="h-4 bg-[#DEDCD1] dark:bg-[#202020] rounded w-1/4"></div>
      </div>
    </div>
  );
}