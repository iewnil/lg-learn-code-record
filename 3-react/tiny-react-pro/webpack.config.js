/*
 * @Description: 
 * @Date: 2021-10-29 19:59:39
 * @LastEditTime: 2021-11-14 19:00:11
 * @LastEditors: linwei
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import ('webpack').Configuration} */
module.exports = {
  entry: "./index.js",
  devServer: {
    port: 9999,
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  pragma: 'TinyReact.createElement'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}