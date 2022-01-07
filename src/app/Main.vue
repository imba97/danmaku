<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  .app-header {
    $header-height: 30px;
    padding-left: 10px;
    height: $header-height;
    background-color: #ccc;

    -webkit-app-region: drag;

    .no-drag {
      -webkit-app-region: no-drag;
    }

    .control-buttons {
      height: $header-height;

      & > div {
        width: $header-height;
        height: $header-height;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #900;
        }
      }

      i {
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
        <div class="no-drag" @click="minimize">
          <i class="iconfont icon-minimize"></i>
        </div>
        <div v-show="!isMaximize" class="no-drag" @click="maximize">
          <i class="iconfont icon-full-screen-enter"></i>
        </div>
        <div v-show="isMaximize" class="no-drag" @click="restore">
          <i class="iconfont icon-full-screen-exit"></i>
        </div>
        <div class="no-drag" @click="close">
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

import { ipcRenderer, remote, Remote } from 'electron'

import EventManager from 'electron-vue-event-manager'
import { OriginalEventType, RendererReceivedMainSend, WindowEventType } from '@/scripts/renderer/Event/EventEnum'
import { WindowConctrl } from '@/scripts/enums/Window'

EventManager.Instance().rendererInit()

@Component({
  name: 'Main'
})
export default class Main extends Vue {

  showHeader = false

  /**
   * 是否是最大化
   */
  isMaximize = false

  created() {
    const path = window.location.href.split('/')
    this.showHeader = !~_.get(path, path.length - 1, '').indexOf('Danmaku')
  }

  maximize() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Maximize)
    this.isMaximize = true
  }

  restore() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Restore)
    this.isMaximize = false
  }

  minimize() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Minimize)
  }

  close() {
    ipcRenderer.send(OriginalEventType.Close, RendererReceivedMainSend.Main)
    // EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Close)
  }
}
</script>
