/*
 * @Description: 封装 gulp 构建工作流
 * @Date: 2021-09-03 22:56:41
 * @LastEditTime: 2021-09-04 18:04:15
 * @LastEditors: linwei
 */

const merge = require('lodash.merge');
const path = require('path');
const gulp = require('gulp');
const { src, dest, parallel, series, watch } = gulp;
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const del = require('del');
const browserSync = require('browser-sync').create();
const defaultConfig = require('./default.config.js');
const cwd = process.cwd();

let config = defaultConfig;

try {
  config = merge({}, defaultConfig, require(path.join(cwd, '/custom.config.js')));
} catch(e) {
  console.log('Error',e)
}

const serve = () => {
  watch(`${config.src}${config.scss}`, sassToCss)
  watch(`${config.src}${config.js}`, scriptsTrans)
  watch(`${config.src}/*.html`, htmlTrans)
  watch([
    `${config.src}${config.images}`,
    `${config.src}${config.fonts}`,
    `${config.public}/**`
  ],browserSync.reload) // 监听文件改变，自动刷新浏览器

  browserSync.init({
    server: {
      baseDir: [config.tempOutput.path, config.src, config.public], // 读取的资源路径
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    port: config.devServer.port, // 服务监听端口
    notify: config.devServer.notify,
    open: config.devServer.open, // 启动时，是否自动打开浏览器
    // files: 'dist/**' // 监听文件改变，自动刷新浏览器
  })
}

const clean = () => {
  return del([config.output.path, config.tempOutput.path]);
}

const sassToCss = () => {
  return src(`${config.src}${config.scss}`, { base: config.src})
    .pipe(plugins.sass({ outputStyle: 'expanded'}))
    .pipe(dest(config.tempOutput.path))
}

const scriptsTrans = () => {
  return src(`${config.src}${config.js}`, { base: config.src})
    .pipe(plugins.babel({ presets: [ require('@babel/preset-env') ] })) // 注意这里
    .pipe(dest(config.tempOutput.path))
}

const htmlTrans = () => {
  return src(`${config.src}/*.html`, { base: config.src})
    .pipe(plugins.swig({ data: config.swigData }))
    .pipe(dest(config.tempOutput.path))
}

const image = () => {
  return src(`${config.src}${config.images}`, { base: config.src})
    .pipe(plugins.imagemin())
    .pipe(dest(config.output.path))
}

const fonts = () => {
  return src(`${config.src}${config.fonts}`, { base: config.src})
    .pipe(plugins.imagemin())
    .pipe(dest(config.output.path))
}

const public = () => {
  return src(`${config.public}/**`, { base: config.public})
    .pipe(dest(config.output.path))
}

// 对编译好的html文件中的构建注释进行解析
const useref = () => {
  return src(`${config.tempOutput.path}/*.html`, { base:  config.tempOutput.path})
    .pipe(plugins.useref({ searchPath: [config.tempOutput.path, '.']})) // searchPath：解析 html 构建注释过程中，定义从哪里查找构建注释中引入的模块，先从 dist下找，如果没有，再从根目录下查找
    // 判断引入的模块后缀 .html .js .css，进行压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(config.output.path)) // 这里就有问题了，之后再改进（因为读取的dist过程中，又往里面写入了，会有冲突）
}

const compile = parallel(sassToCss, scriptsTrans, htmlTrans); // 开发编译时，可以不用构建图片与字体 
const build =  series(
  clean, 
  parallel(
    series(compile, useref), 
    image, 
    fonts, 
    public
  )
);
const develop = series(compile, serve);

module.exports = {
  build,
  develop,
}