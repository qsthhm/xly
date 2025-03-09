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
        {/* 播放器CSS */}
        <link 
          href="https://web.sdk.qcloud.com/player/tcplayer/release/v4.9.0/tcplayer.min.css" 
          rel="stylesheet"
        />
        
        {/* 主题处理 */}
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