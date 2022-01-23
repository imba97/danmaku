import { KoeBilibiliDanmaku } from '@/scripts/types/Danmaku'
import { LiveTCP } from 'bilibili-live-ws'
import { ipcMain } from 'electron'
import EventManager from 'electron-vue-event-manager'

import {
  DanmakuEventType,
  IKoePlugin,
  KoePlugin
} from 'koe-bilibili-danmaku-library'

export function createDanmakuReceiver(plugins: IKoePlugin[]) {
  /**
   * 人气值
   */
  let _popularity = 0

  const live = new LiveTCP(5316)
  // 建立 WebSocket 连接
  live.on('open', () => console.log('opened'))
  // 连接已确认
  live.on('live', () => {
    // 心跳包
    live.on('heartbeat', (popularity) => {
      // 主动获取人气时使用
      _popularity = popularity
      // 人气值推送
      EventManager.Instance().broadcast<number>(
        DanmakuEventType.PopularityChanged,
        popularity
      )
    })

    // 主动获取人气值监听
    ipcMain.once(DanmakuEventType.GetPopularity, (event) => {
      event.sender.send(DanmakuEventType.GetPopularity, _popularity)
    })

    const pluginsInstance: KoePlugin[] = []
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i]
      pluginsInstance.push(new plugin())
    }

    // 监听弹幕消息
    live.on('DANMU_MSG', async (data) => {
      const id = `${data.info[9].ct}${data.info[9].ts}`

      const uid = data.info[2][0]

      const sender = data.info[2][1]
      const message = data.info[1]

      let danmaku: KoeBilibiliDanmaku.Danmaku = {
        id,
        uid,
        sender,
        message
      }

      for (let i = 0; i < pluginsInstance.length; i++) {
        const instance = pluginsInstance[i]
        danmaku = await instance.handle(danmaku)
      }

      console.log(`${danmaku.sender}: ${danmaku.message}`)

      EventManager.Instance().broadcast<KoeBilibiliDanmaku.Danmaku>(
        DanmakuEventType.ReceivedDanmaku,
        danmaku
      )
    })
  })
}
