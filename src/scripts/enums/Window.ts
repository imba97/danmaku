/**
 * 窗口控制（点击按钮）
 */
export enum WindowConctrl {
  /**
   * 最大化
   */
  Minimize = 'Minimize',

  /**
   * 最小化
   */
  Maximize = 'Maximize',

  /**
   * 取消最大化
   */
  Unmaximize = 'Unmaximize',

  /**
   * 关闭
   */
  Close = 'Close'
}

/**
 * 窗口状态变化（自身变化）
 */
export enum WindowStateChange {
  /**
   * 最大化
   */
  Maximize = 'Maximize',

  /**
   * 取消最大化
   */
  Unmaximize = 'Unmaximize'
}
