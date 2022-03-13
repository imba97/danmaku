import { KoeBilibiliDanmaku } from '@/scripts/types/Danmaku'
import { LiveTCP } from 'bilibili-live-ws'
import { ipcMain } from 'electron'
import EventManager from 'electron-vue-event-manager'
import _ from 'lodash'

import { DanmakuEventType } from 'D:/Projects/koe-bilibili-danmaku-library'

export function createDanmakuReceiver() {
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
    ipcMain.on(DanmakuEventType.GetPopularity, (event) => {
      event.sender.send(DanmakuEventType.GetPopularity, _popularity)
    })

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

      console.log(`${danmaku.sender}: ${danmaku.message}`)

      EventManager.Instance().broadcast<KoeBilibiliDanmaku.Danmaku>(
        DanmakuEventType.ReceivedDanmaku,
        danmaku
      )
    })

    let currentGiftMessage = ''

    live.on('SEND_GIFT', ({ data }) => {
      const message = `${data.uname} ${data.action} ${data.num}个 ${data.giftName}`

      // TODO: 优化防刷机制
      if (currentGiftMessage === message) {
        return
      }

      currentGiftMessage = message

      let danmaku: KoeBilibiliDanmaku.Danmaku = {
        id: `${_.random(0, 99999999)}`,
        uid: data.uid,
        sender: '',
        message
      }

      EventManager.Instance().broadcast<KoeBilibiliDanmaku.Danmaku>(
        DanmakuEventType.ReceivedDanmaku,
        danmaku
      )
    })
  })
}
