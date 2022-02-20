/*
 * @Description: 
 * @Date: 2021-10-01 23:05:10
 * @LastEditTime: 2021-10-07 01:04:04
 * @LastEditors: linwei
 */
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';

export default {
  // input: './src/index.js',
  input: {
    foo: './src/index.js',
    bar: './src/bar.js',
  },
  output: {
    // file: './dist/bundle.js',
    // format: 'iife',
    dir: 'dist',
  },
  plugins: [
    json(),
    nodeResolve(),
    commonJs()
  ]
}