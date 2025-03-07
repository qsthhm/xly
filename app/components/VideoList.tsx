'use client';

import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
}

interface VideoListProps {
  videos: Video[];
  currentVideoId: string;
  onSelectVideo: (id: string) => void;
}

export default function VideoList({ videos, currentVideoId, onSelectVideo }: VideoListProps) {
  return (
    <div className="w-full flex flex-col space-y-4 py-2">
      <div className="flex items-center space-x-2 mb-2 px-2">
        <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded">全部</button>
        <button className="px-4 py-1 bg-gray-700 text-white text-sm rounded">包装项目</button>
        <button className="px-4 py-1 bg-gray-700 text-white text-sm rounded">剪辑项目</button>
      </div>
      
      {videos.map((video) => (
        <div
          key={video.id}
          className={`flex cursor-pointer hover:bg-gray-800 p-2 rounded ${
            video.id === currentVideoId ? 'bg-gray-800' : ''
          }`}
          onClick={() => onSelectVideo(video.id)}
        >
          <div className="relative w-32 h-20 flex-shrink-0">
            {/* 使用占位符代替图片，避免图片加载问题 */}
            <div className="w-full h-full bg-gray-700 rounded"></div>
            {/* 如果有图片，可以取消下面的注释 */}
            {/* <Image
              src={video.thumbnail}
              alt={video.title}
              width={128}
              height={80}
              className="rounded object-cover"
            /> */}
          </div>
          <div className="ml-2 flex-grow">
            <h3 className="text-sm text-white font-medium line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {video.description || '我是谁 我擅长什么 我能做什么'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}