import NetWorkRequest from '@/scripts/renderer/Network/base'

export namespace NetWorkBilibili {
  class NetWorkBilibiliBase extends NetWorkRequest {
    constructor() {
      super()

      this.baseUrl = 'https://api.bilibili.com'
    }
  }

  export class User extends NetWorkBilibiliBase {
    /**
     * 获取用户信息
     * @param mid 用户 ID
     * @returns
     */
    public getUserInfo(mid: number) {
      return this.request({
        url: '/x/space/acc/info',
        method: 'GET',
        params: {
          mid
        }
      })
    }
  }
}
