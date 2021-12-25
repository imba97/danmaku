<style lang="scss" scoped>
</style>

<template>
  <div>
    <button @click="test">主窗口像弹幕窗口发送</button>
  </div>
</template>

<script lang="ts">

import { EventType } from '@/base/Event/EventEnum'
import { EventManager } from '@/base/Event/EventManager'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  created() {
    console.log('main addEventListener')
    EventManager.Instance().addEventListener<string>(EventType.ReceivedDanmaku, (danmaku) => {
      console.log('Danmaku', danmaku)
    })
  }

  test() {
    EventManager.Instance().broadcast<string>(EventType.MainSendTest, '从主窗口来的信息')
  }
}

</script>