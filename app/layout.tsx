import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '许璐雅-视频作品集',
  description: '许璐雅的个人视频作品集展示，求职作品',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link 
          href="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.min.css" 
          rel="stylesheet"
        />
        {/* 内联脚本确保主题加载时不闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (err) {}
              })();
            `,
          }}
        />
        
        {/* 预加载播放器脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 预加载腾讯播放器
                if (!document.getElementById('tcplayer-script')) {
                  var script = document.createElement('script');
                  script.id = 'tcplayer-script';
                  script.src = 'https://vod-tool.vod-qcloud.com/dist/static/js/tcplayer.v4.9.1.min.js';
                  script.async = false;
                  document.head.appendChild(script);
                }
                
                // 初始化页面加载时自动播放第一个视频
                window.addEventListener('DOMContentLoaded', function() {
                  setTimeout(function() {
                    if (window.location.pathname === '/' && !window.location.search) {
                      // 在首页且没有查询参数时尝试播放第一个视频
                      var videoElement = document.querySelector('video');
                      if (videoElement && videoElement.__tcplayer__ && typeof videoElement.__tcplayer__.play === 'function') {
                        videoElement.__tcplayer__.play();
                      }
                    }
                  }, 1500);
                });
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#F4F2EB] dark:bg-gray-900 transition-colors duration-200">
        {children}
        
        {/* Clarity 统计代码 */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qkw1zks8n8");
          `}
        </Script>
      </body>
    </html>
  );
}