const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  devServer:{
    contentBase: path.resolve(__dirname,'public'),
    open: true,
    port: 9009,
    hot: true,
    disableHostCheck: true, //  新增该配置项
    // compress:true
    
  },
});