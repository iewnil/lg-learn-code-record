/*
 * @Description: 打包客户端前端代码
 * @Date: 2021-12-03 00:01:19
 * @LastEditTime: 2021-12-04 16:13:19
 * @LastEditors: linwei
 */
const path = require('path');

module.exports = {
  target: 'web', // 不指定时，默认为 web
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
}