import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'

import { app } from 'electron'
import { IKoePlugin } from 'koe-bilibili-danmaku-library'

export function loadPlugins(): IKoePlugin[] {
  const filePath = path.resolve(app.getPath('userData'), 'plugins.json')

  if (!fs.existsSync(filePath)) {
    console.log('找不到文件', filePath)
    return []
  }

  const json = fs.readJsonSync(filePath)

  const plugins: IKoePlugin[] = []
  console.log('dependencies', _.get(json, 'dependencies', {}))

  const pluginsList = _.get(json, 'dependencies', {})

  const loadFile =
    typeof __webpack_require__ === 'function'
      ? __non_webpack_require__
      : require

  for (const key in pluginsList) {
    try {
      const pluginModule = loadFile(pluginsList[key]).default
      plugins.push(pluginModule)
    } catch (e) {
      console.log(`${pluginsList[key]} err: `, e)
    }
  }

  return plugins
}
