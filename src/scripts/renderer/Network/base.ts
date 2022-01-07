import SingletonBase from '@/scripts/renderer/Singleton'
import axios, { AxiosRequestConfig } from 'axios'

export default class NetWorkRequest extends SingletonBase {
  /**
   * 请求接口 URL
   */
  protected baseUrl!: string

  /**
   * axios 实例
   */
  private _axios = axios.create({
    baseURL: this.baseUrl
  })

  /**
   * 发起请求
   * @param options
   * @returns
   */
  protected async request(options: AxiosRequestConfig): Promise<any> {
    return (await this._axios(options)).data
  }
}
