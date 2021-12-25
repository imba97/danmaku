import SingletonBase from '@/base/Singleton'

import { ipcMain, ipcRenderer, BrowserWindow } from 'electron'

import {
  EventType,
  MainEventType,
  RendererReceivedMainSend
} from '@/base/Event/EventEnum'
import {
  Callback,
  Callback1,
  Callback2,
  Callback3,
  Callback4,
  Callback5
} from '@/base/Event/Callback'
import _ from 'lodash'
import { IBrowserWindow } from '@/base/Event/EventInterface'

type EventFunction = (...args: any[]) => any

/**
 * 是否是主线程
 */
const IS_MAIN = ipcMain !== undefined

export class EventManager extends SingletonBase {
  private _mainListener: Map<EventType, EventFunction[]> = new Map()
  private _rendererListener: Map<EventType, EventFunction[]> = new Map()

  public mainInit(windows: IBrowserWindow[]) {
    this.clear()
    console.log('主线程监听 Send')
    ipcMain.on(MainEventType.Send, (_event, type: EventType, ...args) => {
      console.log('主线程接收 Send', type, args)
      _.forEach(windows, (item) => {
        item.window.webContents.send(
          MainEventType.Send,
          item.type,
          type,
          ...args
        )
      })
    })
  }

  public rendererInit(senderType: string) {
    console.log('渲染线程监听 Send', senderType)
    this.clear()
    ipcRenderer.on(
      MainEventType.Send,
      (_, _senderType: string, type: EventType, ...args) => {
        console.log('渲染线程接收 Send', args)
        this._execute(type, true, ...args)
      }
    )
  }

  public clear() {
    this._mainListener = new Map()
    this._rendererListener = new Map()
  }

  private _addEventListener(type: EventType, cb: EventFunction) {
    const _listener = IS_MAIN ? this._mainListener : this._rendererListener

    console.log(IS_MAIN ? '主线程添加监听器' : '渲染线程添加监听器')

    if (!_listener.has(type)) {
      _listener.set(type, new Array<EventFunction>())
    }

    _listener.get(type)!.push(cb as EventFunction)
    // 添加进程对应的事件

    if (IS_MAIN) {
      ipcMain.on(type, (_, ...args) => {
        cb(...args)
      })
    } else {
      ipcRenderer.on(type, (_, ...args) => {
        cb(...args)
      })
    }
  }

  private _removeEventListener(type: EventType, cb: EventFunction) {
    const _listener = IS_MAIN ? this._mainListener : this._rendererListener

    if (!_listener.has(type)) {
      throw new Error('没有事件类型')
    }

    const cbs = _listener.get(type)

    if (!cbs) {
      return
    }

    const index = cbs.indexOf(cb as EventFunction)

    if (~index) {
      cbs.splice(index, 1)
      _listener.set(type, cbs)
      // 移除进程对应的事件
      ;(IS_MAIN ? ipcMain : ipcRenderer).off(type, cb)
    }
  }

  public addEventListener(type: EventType, cb: Callback): void
  public addEventListener<Arg1>(type: EventType, cb: Callback1<Arg1>): void
  public addEventListener<Arg1, Arg2>(
    type: EventType,
    cb: Callback2<Arg1, Arg2>
  ): void
  public addEventListener<Arg1, Arg2, Arg3>(
    type: EventType,
    cb: Callback3<Arg1, Arg2, Arg3>
  ): void
  public addEventListener<Arg1, Arg2, Arg3, Arg4>(
    type: EventType,
    cb: Callback4<Arg1, Arg2, Arg3, Arg4>
  ): void
  public addEventListener<Arg1, Arg2, Arg3, Arg4, Arg5>(
    type: EventType,
    cb: Callback5<Arg1, Arg2, Arg3, Arg4, Arg5>
  ) {
    this._addEventListener(type, cb)
  }

  public removeEventListener(type: EventType, cb: Callback): void
  public removeEventListener<Arg1>(type: EventType, cb: Callback1<Arg1>): void
  public removeEventListener<Arg1, Arg2>(
    type: EventType,
    cb: Callback2<Arg1, Arg2>
  ): void
  public removeEventListener<Arg1, Arg2, Arg3>(
    type: EventType,
    cb: Callback3<Arg1, Arg2, Arg3>
  ): void
  public removeEventListener<Arg1, Arg2, Arg3, Arg4>(
    type: EventType,
    cb: Callback4<Arg1, Arg2, Arg3, Arg4>
  ): void
  public removeEventListener<Arg1, Arg2, Arg3, Arg4, Arg5>(
    type: EventType,
    cb: Callback5<Arg1, Arg2, Arg3, Arg4, Arg5>
  ) {
    this._removeEventListener(type, cb)
  }

  public broadcast(
    type: EventType,
    arg1?: undefined,
    arg2?: undefined,
    arg3?: undefined,
    arg4?: undefined,
    arg5?: undefined
  ): void
  public broadcast<Arg1>(
    type: EventType,
    arg1: Arg1,
    arg2?: undefined,
    arg3?: undefined,
    arg4?: undefined,
    arg5?: undefined
  ): void
  public broadcast<Arg1, Arg2>(
    type: EventType,
    arg1: Arg1,
    arg2: Arg2,
    arg3?: undefined,
    arg4?: undefined,
    arg5?: undefined
  ): void
  public broadcast<Arg1, Arg2, Arg3>(
    type: EventType,
    arg1: Arg1,
    arg2: Arg2,
    arg3: Arg3,
    arg4?: undefined,
    arg5?: undefined
  ): void
  public broadcast<Arg1, Arg2, Arg3, Arg4>(
    type: EventType,
    arg1: Arg1,
    arg2: Arg2,
    arg3: Arg3,
    arg4: Arg4,
    arg5?: undefined
  ): void
  public broadcast<Arg1, Arg2, Arg3, Arg4, Arg5>(
    type: EventType,
    arg1: Arg1,
    arg2: Arg2,
    arg3: Arg3,
    arg4: Arg4,
    arg5: Arg5
  ) {
    const args = [arg1, arg2, arg3, arg4, arg5].filter(
      (arg) => arg !== undefined
    )

    this._execute(type, false, ...args)

    if (!IS_MAIN) {
      ipcRenderer.send(MainEventType.Send, type, ...args)
    }
  }

  private _execute(type: EventType, isMainSend: boolean, ...args: any[]) {
    console.log(type, 'execute')
    if (IS_MAIN) {
      const mainCallback = this._mainListener.get(type)
      if (mainCallback) {
        mainCallback.forEach((cb) => {
          cb(...args)
        })
      }
    } else {
      const rendererCallback = this._rendererListener.get(type)
      if (rendererCallback) {
        rendererCallback.forEach((cb) => {
          console.log(type, 'callback')
          cb(...args)
        })
      }

      if (!isMainSend) ipcRenderer.send(type, ...args)
    }
  }
}
