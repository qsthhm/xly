interface Window {
  TCPlayer: any;
}

// 扩展HTMLElement，添加腾讯云播放器属性
interface HTMLElement {
  __tcplayer__?: any;
}