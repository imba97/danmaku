export default class SingletonBase {
  public static Instance<T>(this: new () => T): T {
    if (!(this as any).instance) (<any>this).instance = new this()
    return (this as any).instance
  }
}
