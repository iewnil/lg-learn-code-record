/*
 * @Description: 
 * @Date: 2021-08-28 12:58:31
 * @LastEditTime: 2021-09-01 23:49:59
 * @LastEditors: linwei
 */

// /**
//  * sass -> css
//  */
// const gulp = require('gulp');
// const { src, dest } = gulp;
// const gulpSass = require('gulp-sass');

// const sassToCss = () => {
//   return src('src/assets/styles/*.scss', { base: 'src'})
//     .pipe(gulpSass({ outputStyle: 'expanded'}))
//     .pipe(dest('dist'))
// }
// module.exports = {
//   sassToCss,
// }

// /**
//  * babel
//  */
// const gulp = require('gulp');
// const { src, dest } = gulp;
// const babel = require('gulp-babel');

// const scriptsTrans = () => {
//   return src('src/assets/scripts/*.js', { base: 'src'})
//     .pipe(babel({ presets: ['@babel/preset-env'] }))
//     .pipe(dest('dist'))
// }

// module.exports = {
//   scriptsTrans
// }

// /**
//  * html模板编译
//  */
// const gulp = require('gulp');
// const { src, dest } = gulp;
// const gulpSwig = require('gulp-swig');

// const swigData = {
//   menus: [
//     {
//       name: 'Home',
//       icon: 'aperture',
//       link: 'index.html'
//     },
//     {
//       name: 'Features',
//       link: 'features.html'
//     },
//     {
//       name: 'About',
//       link: 'about.html'
//     },
//     {
//       name: 'Contact',
//       link: '#',
//       children: [
//         {
//           name: 'Twitter',
//           link: 'https://twitter.com/w_zce'
//         },
//         {
//           name: 'About',
//           link: 'https://weibo.com/zceme'
//         },
//         {
//           name: 'divider'
//         },
//         {
//           name: 'About',
//           link: 'https://github.com/zce'
//         }
//       ]
//     }
//   ],
//   pkg: require('./package.json'),
//   date: new Date()
// }

// const htmlTrans = () => {
//   return src('src/*.html', { base: 'src'})
//     .pipe(gulpSwig({ data: swigData }))
//     .pipe(dest('dist'))
// }

// module.exports = {
//   htmlTrans
// }

// /**
//  * 图片压缩，字体文件拷贝
//  */
// const gulp = require('gulp');
// const { src, dest } = gulp;
// const imagemin = require('gulp-imagemin');

// const image = () => {
//   return src('src/assets/images/**', { base: 'src'})
//     .pipe(imagemin())
//     .pipe(dest('dist'))
// }

// const fonts = () => {
//   return src('src/assets/fonts/**', { base: 'src'})
//     .pipe(imagemin())
//     .pipe(dest('dist'))
// }

// module.exports = {
//   image,
//   fonts
// }

// /**
//  * public 文件拷贝
//  */
// const gulp = require('gulp');
// const { src, dest } = gulp;

// const public = () => {
//   return src('public/**', { base: 'public'})
//     .pipe(dest('dist'))
// }

// module.exports = {
//   public
// }



/**
 * 构建任务合并
 */

// const gulp = require('gulp');
// const { src, dest, parallel } = gulp;
// const gulpSass = require('gulp-sass');
// const babel = require('gulp-babel');
// const gulpSwig = require('gulp-swig');
// const imagemin = require('gulp-imagemin');

// const sassToCss = () => {
//   return src('src/assets/styles/*.scss', { base: 'src'})
//     .pipe(gulpSass({ outputStyle: 'expanded'}))
//     .pipe(dest('dist'))
// }

// const scriptsTrans = () => {
//   return src('src/assets/scripts/*.js', { base: 'src'})
//     .pipe(babel({ presets: ['@babel/preset-env'] }))
//     .pipe(dest('dist'))
// }

// const swigData = {
//   menus: [
//     {
//       name: 'Home',
//       icon: 'aperture',
//       link: 'index.html'
//     },
//     {
//       name: 'Features',
//       link: 'features.html'
//     },
//     {
//       name: 'About',
//       link: 'about.html'
//     },
//     {
//       name: 'Contact',
//       link: '#',
//       children: [
//         {
//           name: 'Twitter',
//           link: 'https://twitter.com/w_zce'
//         },
//         {
//           name: 'About',
//           link: 'https://weibo.com/zceme'
//         },
//         {
//           name: 'divider'
//         },
//         {
//           name: 'About',
//           link: 'https://github.com/zce'
//         }
//       ]
//     }
//   ],
//   pkg: require('./package.json'),
//   date: new Date()
// }

// const htmlTrans = () => {
//   return src('src/*.html', { base: 'src'})
//     .pipe(gulpSwig({ data: swigData }))
//     .pipe(dest('dist'))
// }

// const image = () => {
//   return src('src/assets/images/**', { base: 'src'})
//     .pipe(imagemin())
//     .pipe(dest('dist'))
// }

// const fonts = () => {
//   return src('src/assets/fonts/**', { base: 'src'})
//     .pipe(imagemin())
//     .pipe(dest('dist'))
// }

// const public = () => {
//   return src('public/**', { base: 'public'})
//     .pipe(dest('dist'))
// }

// const compile = parallel(sassToCss, scriptsTrans, htmlTrans, image, fonts);
// const build = parallel(compile, public);

// module.exports = {
//   compile,
//   build
// }

/**
 * 自动 require 插件
 * 构建前清除旧dist
 * 预览服务器
 */

// const gulp = require('gulp');
// const { src, dest, parallel, series, watch } = gulp;
// const loadPlugins = require('gulp-load-plugins');
// const plugins = loadPlugins();
// const del = require('del');
// const browserSync = require('browser-sync').create();

// const serve = () => {
//   watch('src/assets/styles/*.scss', sassToCss)
//   watch('src/assets/scripts/*.js', scriptsTrans)
//   watch('src/*.html', htmlTrans)
//   // watch('src/assets/images/**', image) // 开发编译构建时，可以不用构建这些静态资源
//   // watch('src/assets/fonts/**', image)
//   // watch('public/**', public)
//   watch([
//     'src/assets/images/**',
//     'src/assets/fonts/**',
//     'public/**'
//   ],browserSync.reload) // 监听文件改变，自动刷新浏览器

//   browserSync.init({
//     server: {
//       baseDir: ['dist', 'src', 'public'], // 读取的资源路径
//       routes: {
//         '/node_modules': 'node_modules'
//       }
//     },
//     port: 8888, // 服务监听端口
//     notify: false,
//     open: false, // 启动时，是否自动打开浏览器
//     files: 'dist/**' // 监听打包文件变化
//   })
// }

// const clean = () => {
//   return del(['dist']);
// }

// const sassToCss = () => {
//   return src('src/assets/styles/*.scss', { base: 'src'})
//     .pipe(plugins.sass({ outputStyle: 'expanded'}))
//     .pipe(dest('dist'))
// }

// const scriptsTrans = () => {
//   return src('src/assets/scripts/*.js', { base: 'src'})
//     .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
//     .pipe(dest('dist'))
// }

// const swigData = {
//   menus: [
//     {
//       name: 'Home',
//       icon: 'aperture',
//       link: 'index.html'
//     },
//     {
//       name: 'Features',
//       link: 'features.html'
//     },
//     {
//       name: 'About',
//       link: 'about.html'
//     },
//     {
//       name: 'Contact',
//       link: '#',
//       children: [
//         {
//           name: 'Twitter',
//           link: 'https://twitter.com/w_zce'
//         },
//         {
//           name: 'About',
//           link: 'https://weibo.com/zceme'
//         },
//         {
//           name: 'divider'
//         },
//         {
//           name: 'About',
//           link: 'https://github.com/zce'
//         }
//       ]
//     }
//   ],
//   pkg: require('./package.json'),
//   date: new Date()
// }

// const htmlTrans = () => {
//   return src('src/*.html', { base: 'src'})
//     .pipe(plugins.swig({ data: swigData }))
//     .pipe(dest('dist'))
// }

// const image = () => {
//   return src('src/assets/images/**', { base: 'src'})
//     .pipe(plugins.imagemin())
//     .pipe(dest('dist'))
// }

// const fonts = () => {
//   return src('src/assets/fonts/**', { base: 'src'})
//     .pipe(plugins.imagemin())
//     .pipe(dest('dist'))
// }

// const public = () => {
//   return src('public/**', { base: 'public'})
//     .pipe(dest('dist'))
// }

// const compile = parallel(sassToCss, scriptsTrans, htmlTrans); // 开发编译时，可以不用构建图片与字体 
// const build =  series(clean, parallel(compile, image, fonts, public));
// const develop = series(compile, serve);

// module.exports = {
//   compile,
//   build,
//   serve,
//   develop,
// }

/**
 * 解析构建注释
 * 构建配置改进
 */
const gulp = require('gulp');
const { src, dest, parallel, series, watch } = gulp;
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const del = require('del');
const browserSync = require('browser-sync').create();

const serve = () => {
  watch('src/assets/styles/*.scss', sassToCss)
  watch('src/assets/scripts/*.js', scriptsTrans)
  watch('src/*.html', htmlTrans)
  // watch('src/assets/images/**', image) // 开发编译构建时，可以不用构建这些静态资源
  // watch('src/assets/fonts/**', image)
  // watch('public/**', public)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ],browserSync.reload) // 监听文件改变，自动刷新浏览器

  browserSync.init({
    server: {
      baseDir: ['temp', 'src', 'public'], // 读取的资源路径
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    port: 8888, // 服务监听端口
    notify: false,
    open: false, // 启动时，是否自动打开浏览器
    // files: 'dist/**' // 监听文件改变，自动刷新浏览器
  })
}

const clean = () => {
  return del(['dist', 'temp']);
}

const sassToCss = () => {
  return src('src/assets/styles/*.scss', { base: 'src'})
    .pipe(plugins.sass({ outputStyle: 'expanded'}))
    .pipe(dest('temp'))
}

const scriptsTrans = () => {
  return src('src/assets/scripts/*.js', { base: 'src'})
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
}

const swigData = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const htmlTrans = () => {
  return src('src/*.html', { base: 'src'})
    .pipe(plugins.swig({ data: swigData }))
    .pipe(dest('temp'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const fonts = () => {
  return src('src/assets/fonts/**', { base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const public = () => {
  return src('public/**', { base: 'public'})
    .pipe(dest('dist'))
}

// 对编译好的html文件中的构建注释进行解析
const useref = () => {
  return src('temp/*.html', { base: 'temp'})
    .pipe(plugins.useref({ searchPath: ['temp', '.']})) // searchPath：解析 html 构建注释过程中，定义从哪里查找构建注释中引入的模块，先从 dist下找，如果没有，再从根目录下查找
    // 判断引入的模块后缀 .html .js .css，进行压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist')) // 这里就有问题了，之后再改进（因为读取的dist过程中，又往里面写入了，会有冲突）
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