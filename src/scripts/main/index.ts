import {
  app,
  screen,
  protocol,
  BrowserWindow,
  remote,
  Remote,
  ipcMain
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import {
  OriginalEventType,
  RendererType,
  WindowEventType
} from '@/scripts/renderer/Event/EventEnum'
import { WindowConctrl } from '@/scripts/enums/Window'

import _ from 'lodash'
import EventManager from 'electron-vue-event-manager'
import { IBrowserWindow } from '@/scripts/renderer/Event/EventInterface'

// 网络请求监听器
// import '@/scripts/main/Network'

import { createWindowStateListener } from './Window'
import { createDanmakuReceiver } from './DanmakuReceiver'
import { loadPlugins } from './PluginLoader'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const browserWindow: IBrowserWindow[] = []

type IWindow = {
  [key: string]: {
    x?: number
    y?: number
    title: string
    type: string
    width: number
    height: number
    path: string
    dev: string
    transparent?: boolean
  }
}

async function createWindow() {
  // Menu.setApplicationMenu(null)

  ipcMain.on(OriginalEventType.Close, (_event, type: string) => {
    const item = _.find(browserWindow, {
      type
    })

    if (item) {
      item.window.close()
    }
  })

  const windows: IWindow = {
    /**
     * 主窗口
     */
    main: {
      title: 'main',
      type: RendererType.Main,
      width: 1600,
      height: 900,
      path: 'app://./main.html',
      dev: 'main.html',
      transparent: false
    },

    /**
     * 弹幕窗口
     */
    danmaku: {
      title: 'danmaku',
      type: RendererType.Danmaku,
      width: 300 + (isDevelopment ? 800 : 0),
      height: 400 + (isDevelopment ? 300 : 0),
      path: 'app://./danmaku.html',
      dev: 'danmaku.html',
      transparent: true
    }
  }

  // 设置弹幕窗口初始位置
  windows.danmaku.x = 0
  // screen.getPrimaryDisplay().workAreaSize.width - windows.danmaku.width
  windows.danmaku.y =
    screen.getPrimaryDisplay().workAreaSize.height - windows.danmaku.height

  _.forEach(windows, async (window) => {
    let win: BrowserWindow = new BrowserWindow({
      x: window.x,
      y: window.y,
      title: window.title,
      width: window.width,
      height: window.height,
      frame: false,
      transparent: window.transparent,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env
          .ELECTRON_NODE_INTEGRATION as unknown as boolean,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    })

    win.webContents.backgroundThrottling = false

    browserWindow.push({
      window: win,
      type: window.type
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(
        `${process.env.WEBPACK_DEV_SERVER_URL as string}${window.dev}`
      )
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL(window.path)
    }

    // 窗口监听事件
    switch (window.type) {
      case RendererType.Main: {
        // 监听最小化最大化
        EventManager.Instance().addEventListener<WindowConctrl>(
          WindowEventType.MainWindowConctrl,
          (type) => {
            windowConctrl(win, type)
          }
        )

        break
      }
      case RendererType.Danmaku: {
        break
      }
    }

    // 创建窗口状态监听
    createWindowStateListener(win)
  })

  EventManager.Instance().mainInit(browserWindow)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e: any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

  // 创建弹幕接收器
  const plugins = loadPlugins()
  createDanmakuReceiver(plugins)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

function windowConctrl(win: BrowserWindow, type: WindowConctrl) {
  switch (type) {
    case WindowConctrl.Maximize: {
      win.maximize()
      break
    }

    case WindowConctrl.Minimize: {
      win.minimize()
      break
    }

    case WindowConctrl.Unmaximize: {
      win.unmaximize()
      break
    }

    case WindowConctrl.Close: {
      win.close()
      break
    }
  }
}
