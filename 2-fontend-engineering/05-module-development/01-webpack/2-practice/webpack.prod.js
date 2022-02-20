const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common,{
  optimization: {
    // minimize:true,
    // minimizer: [
    //   // new TerserJSPlugin({}),
    //   new OptimizeCSSAssetsPlugin({})
    // ]
    usedExports: true,
    sideEffects: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ]
});