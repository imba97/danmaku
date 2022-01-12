const path = require('path')
// import path from 'path'

module.exports = {
  pages: {
    main: {
      // page 的入口
      entry: 'src/entry/main.ts',
      // 模板来源
      template: 'public/main.html',
      // 在 dist/index.html 的输出
      filename: 'main.html'
    },
    danmaku: {
      // page 的入口
      entry: 'src/entry/danmaku.ts',
      // 模板来源
      template: 'public/danmaku.html',
      // 在 dist/index.html 的输出
      filename: 'danmaku.html'
    }
  },

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: path.resolve(__dirname, 'src/scripts/main/index.ts')
    }
  }
}
