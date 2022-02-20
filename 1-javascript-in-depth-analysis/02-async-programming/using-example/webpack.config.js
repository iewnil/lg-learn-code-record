/*
 * @Description: 
 * @Date: 2021-06-30 23:31:19
 * @LastEditTime: 2021-07-04 16:16:24
 * @LastEditors: linwei
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  plugins:[
    new HtmlWebpackPlugin()
  ]
};