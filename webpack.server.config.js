const baseConfig = require('./webpack.config')
const merge = require('webpack-merge')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [new VueSSRServerPlugin()]
})
