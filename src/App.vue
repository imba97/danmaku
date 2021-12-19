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
    <div class="app-header flexBC">
      <div class="app-title">danmaku</div>
      <div class="control-buttons flexBC">
        <i class="iconfont icon-minimize"></i>
        <i class="iconfont icon-full-screen-exit"></i>
        <i class="iconfont icon-full-screen-enter"></i>
        <i class="iconfont icon-close"></i>
      </div>
    </div>
    <div class="app-content">
      <DanmakuVue></DanmakuVue>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DanmakuVue from '@/views/Danmaku.vue'

@Component({
  name: 'App',
  components: {
    DanmakuVue
  }
})
export default class App extends Vue {}
</script>
