<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  .v-app-bar {
    -webkit-app-region: drag;
  }

  .app-header {
    width: 100%;
    $header-height: 30px;
    padding-left: 10px;
    height: $header-height;

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
  <v-app class="app-main">
    <v-app-bar app>
      <div v-show="showHeader" class="app-header flexBC">
        <div class="app-title">danmaku</div>
        <div class="control-buttons flexBC">
          <div class="no-drag" @click="minimize">
            <i class="iconfont icon-minimize"></i>
          </div>
          <div v-show="!isMaximize" class="no-drag" @click="maximize">
            <i class="iconfont icon-full-screen-enter"></i>
          </div>
          <div v-show="isMaximize" class="no-drag" @click="unmaximize">
            <i class="iconfont icon-full-screen-exit"></i>
          </div>
          <div class="no-drag" @click="close">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>
    </v-app-bar>

    <v-main class="app-content">
      <v-row>
        <v-col cols="3">
          <v-navigation-drawer style="width: 100%;" permanent>
            <v-list class="pt-6">
              <v-list-item v-for="[icon, text] in links" :key="icon" link>
                <v-list-item-icon>
                  <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="9">
          <v-container style="overflow: auto; height: calc(100% - 84px)" class="py-6 pr-8" fluid>
            <router-view></router-view>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'

import { ipcRenderer } from 'electron'

import EventManager from 'electron-vue-event-manager'
import { OriginalEventType, RendererType, WindowEventType } from '@/scripts/renderer/Event/EventEnum'
import { WindowConctrl, WindowStateChange } from '@/scripts/enums/Window'

EventManager.Instance().rendererInit()

@Component({
  name: 'Main'
})
export default class Main extends Vue {

  showHeader = false

  drawer = null

  links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam'],
  ]

  /**
   * 是否是最大化
   */
  isMaximize = false

  created() {
    const path = window.location.href.split('/')
    this.showHeader = !~_.get(path, path.length - 1, '').indexOf('Danmaku')

    this.createWindowStateChangedListener()
  }

  /**
   * 创建窗口状态改变监听器
   */
  createWindowStateChangedListener() {
    EventManager.Instance().addEventListener<WindowStateChange>(WindowEventType.MainWindowStateChanged, (windowStateChange) => {
      this.isMaximize = windowStateChange === WindowStateChange.Maximize
    })
  }

  maximize() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Maximize)
    this.isMaximize = true
  }

  unmaximize() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Unmaximize)
    this.isMaximize = false
  }

  minimize() {
    EventManager.Instance().broadcast(WindowEventType.MainWindowConctrl, WindowConctrl.Minimize)
  }

  close() {
    ipcRenderer.send(OriginalEventType.Close, RendererType.Main)
  }
}
</script>
