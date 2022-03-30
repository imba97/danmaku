import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'

import { app } from 'electron'
import { KoePlugin } from 'koe-bilibili-danmaku-library'

export function loadPlugins(): KoePlugin[] {
  const filePath = path.resolve(app.getPath('userData'), 'plugins.json')

  if (!fs.existsSync(filePath)) {
    console.log('找不到文件', filePath)
    return []
  }

  const json = fs.readJsonSync(filePath)

  const plugins: KoePlugin[] = []

  const pluginsList = _.get(json, 'dependencies', {})

  const loadFile =
    typeof __webpack_require__ === 'function'
      ? __non_webpack_require__
      : require

  for (const key in pluginsList) {
    try {
      const pluginModule = loadFile(pluginsList[key]).default
      plugins.push(new pluginModule())
    } catch (e) {
      console.log(`${pluginsList[key]} err: `, e)
    }
  }

  return plugins
}
