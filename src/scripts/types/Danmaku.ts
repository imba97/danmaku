export namespace KoeBilibiliDanmaku {
  export interface Danmaku {
    id: string

    /**
     * 发送者 ID
     */
    uid: number

    /**
     * 发送者
     */
    sender: string
    /**
     * 弹幕
     */
    message: string

    /**
     * 自定义动画
     */
    custom_animation?: string
  }

  export type Content = {
    /**
     * 人气
     */
    popularity: number

    /**
     * 弹幕数组
     */
    DANMU_MSG: Danmaku[]
  }
}
