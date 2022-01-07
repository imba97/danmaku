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
    <div class="app-header"></div>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'

import EventManager from 'electron-vue-event-manager'

EventManager.Instance().rendererInit()

@Component({
  name: 'Main'
})
export default class Danmaku extends Vue {

  public showHeader = false
}
</script>
