export enum EventType {
  MainSendTest = 'MainSendTest',

  DanmakuSendTest = 'DanmakuSendTest',

  /**
   * 接收了到弹幕
   */
  ReceivedDanmaku = 'ReceivedDanmaku'
}

export const RendererReceivedMainSend = Object.freeze({
  Main: 'main',
  Danmaku: 'danmaku'
})

export enum MainEventType {
  Send = 'Send'
}
