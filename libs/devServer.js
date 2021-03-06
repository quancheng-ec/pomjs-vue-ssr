const path = require('path')
const webpack = require('webpack')
const { createBundleRenderer } = require('vue-server-renderer')
const clientConfig = require('./webpack.config')
const serverConfig = require('./webpack.config.server')
const fs = require('fs')
const MFS = require('memory-fs')

module.exports = () => {
  const clientCompiler = webpack(clientConfig)
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()

  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })
}
