// 在VideoList.tsx中修改分类切换按钮部分：

<div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm px-4 py-3 border-b border-border flex space-x-3 overflow-x-auto">
  <button 
    className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
      currentCategory === 'all' 
        ? 'bg-blue-600 text-white' 
        : 'bg-secondary hover:bg-accent/50'
    }`}
    onClick={() => onCategoryChange('all')}
  >
    全部
  </button>
  <button 
    className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
      currentCategory === 'packaging' 
        ? 'bg-blue-600 text-white' 
        : 'bg-secondary hover:bg-accent/50'
    }`}
    onClick={() => onCategoryChange('packaging')}
  >
    包装项目
  </button>
  <button 
    className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-colors ${
      currentCategory === 'editing' 
        ? 'bg-blue-600 text-white' 
        : 'bg-secondary hover:bg-accent/50'
    }`}
    onClick={() => onCategoryChange('editing')}
  >
    剪辑项目
  </button>
</div>