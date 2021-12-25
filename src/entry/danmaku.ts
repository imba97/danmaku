import Vue from 'vue'
import App from '@/app/Danmaku.vue'
import router from '@/router/danmaku'
import store from '@/store'

import '@/styles/index.scss'
import '@/styles/iconfont.css'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
