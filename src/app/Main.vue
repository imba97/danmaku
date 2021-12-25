<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  .app-header {
    padding: 0 10px;
    height: 30px;
    background-color: #ccc;

    -webkit-app-region: drag;

    .control-buttons {
      width: 100px;

      i {
        display: block;
        height: 100%;

        &.icon-close {
          font-size: 20px;
        }
      }
    }
  }

  .app-content {
    flex: 1;
  }
}
</style>

<template>
  <div class="app-main">
    <div v-show="showHeader" class="app-header flexBC">
      <div class="app-title">danmaku</div>
      <div class="control-buttons flexBC">
        <div>
          <i class="iconfont icon-minimize"></i>
        </div>
        <div>
          <i class="iconfont icon-full-screen-exit"></i>
        </div>
        <div>
          <i class="iconfont icon-full-screen-enter"></i>
        </div>
        <div>
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </div>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'

import { EventManager } from '@/base/Event/EventManager'
import { RendererReceivedMainSend } from '@/base/Event/EventEnum'

EventManager.Instance().rendererInit(RendererReceivedMainSend.Main)

@Component({
  name: 'Main'
})
export default class Main extends Vue {

  public showHeader = false

  created() {
    const path = window.location.href.split('/')
    this.showHeader = !~_.get(path, path.length - 1, '').indexOf('Danmaku')
  }
}
</script>
