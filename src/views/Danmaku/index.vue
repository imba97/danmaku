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

import { KoeBilibiliDanmaku } from '@/scripts/types/Danmaku'
import EventManager from 'electron-vue-event-manager'

import { DanmakuEventType } from 'D:/Projects/@types-koe-bilibili-danmaku'

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
        uid: 2198461,
        sender: 'imba久期',
        message: `测试测试测试_${num}`
      })
    })

    EventManager.Instance().addEventListener<number>(DanmakuEventType.PopularityChanged, popularity => {
      this.danmaku.popularity = popularity
    })

    EventManager.Instance().addEventListener<KoeBilibiliDanmaku.Danmaku>(DanmakuEventType.ReceivedDanmaku, danmaku => {
      this.danmaku.DANMU_MSG.push(danmaku)
    })
  }

  test() {
    const num = this.danmaku.DANMU_MSG.length + 1
    this.danmaku.DANMU_MSG.push({
      id: `${num}`,
      uid: 2198461,
      sender: 'imba久期',
      message: `测试测试测试_${num}`
    })
  }
}
</script>
