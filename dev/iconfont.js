const IconfontBuilder = require('simple-iconfont-builder')
const { resolve } = require('path')

IconfontBuilder.build(resolve(__dirname, '../src/styles/iconfont.css'))
