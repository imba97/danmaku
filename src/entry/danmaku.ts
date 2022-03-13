import Vue from 'vue'
import App from '@/app/Danmaku.vue'
import router from '@/router/danmaku'
import store from '@/store'

import '@/styles/index.scss'
import '@/styles/iconfont.css'
import 'animate.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App)
}).$mount('#app')
