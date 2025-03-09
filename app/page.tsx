// 在app/page.tsx中修改以下部分

// 1. 移除forceRefresh状态
// 将这行
const [forceRefresh, setForceRefresh] = useState(0); // 添加强制刷新计数器

// 改为
const [pageLoaded, setPageLoaded] = useState(false);

// 2. 修改useEffect中的内容
useEffect(() => {
  const loadInitialState = () => {
    try {
      // 在客户端运行时从URL获取参数
      const url = new URL(window.location.href);
      const videoId = url.searchParams.get('v');
      
      if (videoId) {
        // 检查URL中的视频ID是否存在于视频列表中
        const videoExists = ALL_VIDEOS.some(v => v.id === videoId);
        if (videoExists) {
          setCurrentVideoId(videoId);
        }
      }
    } catch (error) {
      console.error('初始化参数错误:', error);
    } finally {
      // 初始化完成后关闭加载状态
      setIsLoading(false);
      
      // 设置页面已加载标志
      setTimeout(() => {
        setPageLoaded(true);
      }, 100);
    }
  };
  
  loadInitialState();
}, []);

// 3. 修改渲染视频播放器的部分，替换key属性
<div className="rounded-xl overflow-hidden">
  {pageLoaded && (
    <VideoPlayer 
      key={`video-${currentVideo.id}`} // 移除forceRefresh
      fileId={currentVideo.id} 
      appId={TENCENT_APP_ID}
      psign={currentVideo.psign || ''}
    />
  )}
</div>