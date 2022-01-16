// export enum EventType {

// }

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

/**
 * 原生事件类型
 */
export enum OriginalEventType {
  Close = 'Close'
}

/**
 * 渲染进程类型
 */
export const RendererType = Object.freeze({
  Main: 'main',
  Danmaku: 'danmaku'
})
