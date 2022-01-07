<style lang="scss" scoped>
.danmaku-container {
  position: relative;
  height: 100%;
}
.danmaku {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  .danmaku-item {
    display: flex;

    .danmaku-text {
      font-size: 22px;
      font-weight: 700;
      color: #ff0;
      $shadowSize: 1px;
      $shadowColor: #333;
      text-shadow: $shadowColor $shadowSize 0 0, $shadowColor 0 $shadowSize 0,
        $shadowColor (-$shadowSize) 0 0, $shadowColor 0 (-$shadowSize) 0;
    }
  }
}
</style>


<template>
  <div class="danmaku-container">
    {{ danmaku.popularity }}
    <p>
      <button @click="test">测试</button>
    </p>
    <ul class="danmaku">
      <li
        v-for="item in danmaku.DANMU_MSG"
        :key="item.id"
        class="danmaku-item animate__animated"
        :class="
          item.custom_animation && item.custom_animation !== ''
            ? `animate__${item.custom_animation}`
            : 'animate__fadeInUp'
        "
      >
        <div class="danmaku-text">{{ item.sender }}: {{ item.message }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { LiveWS } from 'bilibili-live-ws'

import { KoeBilibiliDanmaku } from '@/scripts/types/Danmaku'
import EventManager from 'electron-vue-event-manager'
import { EventType } from '@/scripts/renderer/Event/EventEnum'

@Component
export default class Danmaku extends Vue {
  public danmaku: KoeBilibiliDanmaku.Content = {
    popularity: 0,
    DANMU_MSG: []
  }

  @Watch('danmaku.DANMU_MSG')
  danmakuMessageChanged(danmaku: KoeBilibiliDanmaku.Danmaku[]) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(danmaku[danmaku.length - 1].message))
  }

  created() {

    _.forEach([1, 2, 3, 4, 5], (num) => {
      this.danmaku.DANMU_MSG.push({
        id: `${num}`,
        sender: 'imba久期',
        message: `测试测试测试_${num}`
      })
    })

    const live = new LiveWS(5316)
    // 建立 WebSocket 连接
    live.on('open', () => console.log('opened'))
    // 连接已确认
    live.on('live', () => {
      // 心跳包
      live.on('heartbeat', (popularity) => {
        // 人气值
        this.danmaku.popularity = popularity
      })

      // 监听弹幕消息
      live.on('DANMU_MSG', (data) => {
        const id = `${data.info[9].ct}${data.info[9].ts}`

        const uid = data.info[2][0]

        // axios
        //   .get(`https://api.bilibili.com/x/space/acc/info?mid=${uid}`)
        //   .then((res) => {
        //     console.log(res.data)
        //   })

        const sender = data.info[2][1]
        const messageTemp = data.info[1]
        const messageReg = /^\/(\w+) (.*)/.exec(messageTemp)

        const message = messageReg !== null ? messageReg[2] : messageTemp

        if (message === 'clear') {
          this.danmaku.DANMU_MSG = []
          return
        }

        const danmaku = {
          id,
          sender,
          message,
          custom_animation: messageReg !== null ? messageReg[1] : ''
        }

        const index = this.danmaku.DANMU_MSG.push(danmaku)

        EventManager.Instance().broadcast<KoeBilibiliDanmaku.Danmaku>(EventType.ReceivedDanmaku, danmaku)

        setTimeout(() => {
          console.log('remove')
          const danmakuIndex = index - 1
          if (!_.has(this.danmaku.DANMU_MSG, danmakuIndex)) return
          this.danmaku.DANMU_MSG[index - 1].custom_animation = 'none'
        }, 2000)
      })
    })
  }

  test() {
    const num = this.danmaku.DANMU_MSG.length + 1
    this.danmaku.DANMU_MSG.push({
      id: `${num}`,
      sender: 'imba久期',
      message: `测试测试测试_${num}`
    })
  }
}
</script>
