/*
 * @Description: 
 * @Date: 2021-09-11 23:51:54
 * @LastEditTime: 2021-09-15 23:27:23
 * @LastEditors: linwei
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader',
          'css-loader' 
        ]
      },
      // {
      //   test: /\.(png|jpe?g|svg|ico)(\?.*)?$/,
      //   use: [ 'file-loader']
      // }
      {
        test: /\.(png|jpe?g|svg|ico)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100 * 1024, // 小于 100 KiB （102400 bytes） 会被转为 dataURL
          }
        }]
      }
    ]
  }
}