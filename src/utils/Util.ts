import SingletonBase from '@/scripts/renderer/Singleton'

export default class Util extends SingletonBase {
  public GET(key: string): string {
    const reg = new RegExp(`${key}=([^=&]+)`)
    if (!reg.test(window.location.href)) return ''
    return reg.exec(window.location.href)![1]
  }

  public test() {
    console.log('test')
  }
}
