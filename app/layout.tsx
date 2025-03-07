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
      </head>
      <body className="bg-background text-foreground transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}