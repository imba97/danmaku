<style lang="scss" scoped>
.card-item {
  height: 200px;
}
</style>

<template>
  <v-row>
    <v-col v-for="n in 10" :key="n" xs="12" sm="6" md="4" lg="4" xl="3">
      <v-card class="card-item" color="#385F73" dark>
        <v-card-title class="text-h5">测试</v-card-title>

        <v-card-subtitle>歪比巴卜</v-card-subtitle>

        <v-card-actions>
          <v-btn text>Listen Now</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { DanmakuEventType } from 'D:/Projects/koe-bilibili-danmaku-library'
import EventManager from 'electron-vue-event-manager'
import { Vue, Component } from 'vue-property-decorator'

import { NetWorkBilibili } from '@/scripts/renderer/Network/bilibili'

@Component
export default class Main extends Vue {
  created() {
    console.log('main addEventListener')
    EventManager.Instance().addEventListener<string>(DanmakuEventType.ReceivedDanmaku, (danmaku) => {
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