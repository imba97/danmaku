export enum EventType {
  /**
   * 接收了到弹幕
   */
  ReceivedDanmaku = 'ReceivedDanmaku',

  /**
   * 网络请求
   */
  NetWorkRequest = 'NetWorkRequest'
}

export enum WindowEventType {
  /**
   * 主窗口最小化
   */
  MainWindowConctrl = 'MainWindowConctrl',

  /**
   * 弹幕窗口最大化
   */
  DanmakuMaximize = 'DanmakuMaximize'
}

export enum OriginalEventType {
  Close = 'Close'
}

export const RendererReceivedMainSend = Object.freeze({
  Main: 'main',
  Danmaku: 'danmaku'
})
