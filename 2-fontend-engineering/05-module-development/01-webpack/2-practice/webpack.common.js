const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => ({
  target: 'web',
  // devtool: 'cheap-moudle-eval-source-map',
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/
  // },
  externals: {
    jquery: 'jQuery'
  },
  // entry:'./src/index.js', // 配置打包入口文件
  entry: {
    main:'./src/index.js',
    test:'./src/test.js'
  },
  output:{
    path: path.resolve(__dirname,'bundle'), // 必须是绝对路径
    // path: path.resolve(__dirname,'bundle_[hash]'), // 必须是绝对路径
    // filename:'main.js'
    filename:'[name].js',
    // filename:'[name].[contenthash].[id].js'
    // publicPath: 'webpckPublicPath'
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    },
    mainFiles:['index'],
    mainFields:['mainc','main'],
    modules:[path.resolve(__dirname,'src/components'),'node_modules'],
    extensions:['.ts','.js'],
    // enforceExtension: true
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/template.html',
      filename:'index.html',
      title: '这是标题哈哈哈',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template:'./src/template.html',  
      filename:'test.html',  
      title: '这是测试chunk哈哈哈',
      chunks: ['test'],
    }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    rules:[
      {
        test: /\.m?js$/,
        exclude: /node_modules/, // 忽略 node_modules
        use: [{
          loader: "babel-loader",
          options: {
            presets:[
              // '@babel/preset-env'
              [
                '@babel/preset-env',
                {
                  targets:{
                    'chrome':'88',
                    'ie':'11',
                  },
                  modules:'auto', // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".
                  useBuiltIns:'usage',
                  corejs:{
                    version: '3.8',
                    proposals: false,
                  }  
                }
              ]
            ]
          }
        }]
      },
      {
        test:/\.css$/,
        // use:['style-loader','css-loader']
        // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        use: [
          env === 'production' && {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   insert:'head'
            // },
          },
          'css-loader'
        ].filter(Boolean),
      },
      // {
      //   test: /\.(png|jp?g|gif)$/,
      //   use: ['file-loader']
      //   // use:[
      //   //   {
      //   //     loader: 'file-loader',
      //   //     options: {
      //   //       // publicPath: 'fileLoaderPublicPath',
      //   //       // esModule:false
      //   //       // outputPath:'fileLoaderOutputPath'
      //   //     }
      //   //   }
      //   // ]
      // },
      {
        test: /\.(png|jp?g|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit: 64609
              // publicPath:'urlLoaderPublicPath',
              // outputPath:'urlLoaderOutputPath'
            }
          }
        ]
      }
    ]
  }
});