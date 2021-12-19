export namespace KoeBilibiliDanmaku {
  export type Content = {
    /**
     * 人气
     */
    popularity: number

    /**
     * 弹幕数组
     */
    DANMU_MSG: {
      id: string

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
    }[]
  }
}
