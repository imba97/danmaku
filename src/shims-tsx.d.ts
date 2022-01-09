import Vue, { VNode } from 'vue'

import EventManager from 'D:/Projects/electron-vue-event-manager/electron-vue-event-manager'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'electron-vue-event-manager' {
  export default EventManager
}
