/*
 * @Description: 打包预览服务器代码 
 * @Date: 2021-12-03 00:01:33
 * @LastEditTime: 2021-12-04 16:06:01
 * @LastEditors: linwei
 */

// 因为 server.js 采用的时 ES Modules 语法，所以需要通过 webpack 进行打包
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  externals: [nodeExternals()] // 打包时排除 node_modules 文件夹
}