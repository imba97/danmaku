import { BrowserWindow } from 'electron'
import EventManager from 'electron-vue-event-manager'

import { WindowStateChange } from '@/scripts/enums/Window'
import { WindowEventType } from '@/scripts/renderer/Event/EventEnum'

/**
 * 创建窗口状态监听器
 *  - 监听最大化、取消最大化 用于更换控制图标样式
 * @param win 窗口实例
 */
export function createWindowStateListener(win: BrowserWindow) {
  // 最大化
  win.on('maximize', () => {
    EventManager.Instance().broadcast<WindowStateChange>(
      WindowEventType.MainWindowStateChanged,
      WindowStateChange.Maximize
    )
  })

  // 取消最大化
  win.on('unmaximize', () => {
    EventManager.Instance().broadcast<WindowStateChange>(
      WindowEventType.MainWindowStateChanged,
      WindowStateChange.Unmaximize
    )
  })
}
