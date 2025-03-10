'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// 简化的hook，用于在导航时销毁视频播放器
export default function useCleanupVideoOnNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 销毁所有视频播放器
  const cleanupAllPlayers = () => {
    // 检查并清理腾讯播放器
    if (window.__tcplayers && Array.isArray(window.__tcplayers)) {
      try {
        window.__tcplayers.forEach(player => {
          if (player && typeof player.dispose === 'function') {
            player.dispose();
          }
        });
        window.__tcplayers = [];
      } catch (err) {
        console.error('销毁播放器失败:', err);
      }
    }
  };

  // 监听路由变化
  useEffect(() => {
    // 返回一个清理函数，当组件卸载或路由改变前执行
    return () => {
      cleanupAllPlayers();
    };
  }, [pathname, searchParams]);

  return null;
}