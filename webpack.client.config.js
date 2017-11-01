const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const resolve = (p, root) => path.resolve(root || __dirname, p)
const mockPageRootDir = resolve('./example/pages')
fs.readdirSync(mockPageRootDir).map(dir => {
  const dirPath = resolve(dir, mockPageRootDir)
  console.log(dir, fs.readdirSync(dirPath))
})

module.exports = merge(base, {
  entry: resolve('./clientEntry.js'),
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})
