import { EventType } from '@/scripts/renderer/Event/EventEnum'
import EventManager from 'electron-vue-event-manager'

import axios, { AxiosRequestConfig } from 'axios'

EventManager.Instance().addEventListener<
  AxiosRequestConfig,
  (response: any) => void
>(EventType.NetWorkRequest, (config, callback) => {
  axios(config).then((res) => {
    callback(res.data)
  })
})
