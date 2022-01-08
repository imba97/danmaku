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
   * 主窗口控制键
   */
  MainWindowConctrl = 'MainWindowConctrl',

  /**
   * 主窗口状态发生改变
   *  - 最大化
   *  - 取消最大化
   */
  MainWindowStateChanged = 'MainWindowStateChanged'
}

export enum OriginalEventType {
  Close = 'Close'
}

export const RendererReceivedMainMessage = Object.freeze({
  Main: 'main',
  Danmaku: 'danmaku'
})
