<style lang="scss" scoped>
</style>

<template>
  <div>
    <button @click="test">主窗口向弹幕窗口发送</button>
  </div>
</template>

<script lang="ts">

import { EventType } from '@/scripts/renderer/Event/EventEnum'
import EventManager from 'electron-vue-event-manager'
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
    console.log('test')
  }
}

</script>