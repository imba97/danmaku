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

import { NetWorkBilibili } from '@/scripts/renderer/Network/bilibili'

@Component
export default class Main extends Vue {
  created() {
    console.log('main addEventListener')
    EventManager.Instance().addEventListener<string>(EventType.ReceivedDanmaku, (danmaku) => {
      console.log('Danmaku', danmaku)
    })
  }

  test() {
    NetWorkBilibili.User.Instance().getUserInfo(2198461).then(res => {
      console.log('ohhhh', res)
    })
  }
}

</script>