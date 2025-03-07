import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '个人作品集 | 视频展示',
  description: '使用腾讯云VOD的个人视频作品集展示',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        {/* 添加腾讯云播放器样式 */}
        <link 
          href="https://web.sdk.qcloud.com/player/tcplayer/release/v4.7.2/tcplayer.min.css" 
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}