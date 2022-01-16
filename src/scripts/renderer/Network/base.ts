import _ from 'lodash'
import { AxiosRequestConfig } from 'axios'

import EventManager from 'electron-vue-event-manager'

import SingletonBase from '@/scripts/renderer/Singleton'

export default class NetWorkRequest extends SingletonBase {
  /**
   * 请求接口 URL
   */
  protected baseUrl!: string

  /**
   * 发起请求
   * @param options
   * @returns
   */
  protected async request(options: AxiosRequestConfig): Promise<any> {
    // 设置 baseUrl
    if (this.baseUrl) {
      _.set(options, 'baseURL', this.baseUrl)
    }

    // 向主进程请求
    return EventManager.Instance().sendRequest(options)
  }
}
