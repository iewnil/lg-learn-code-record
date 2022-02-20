/*
 * @Description: Grunt 的入口文件
 * @Date: 2021-08-21 00:13:42
 * @LastEditTime: 2021-08-22 22:28:36
 * @LastEditors: linwei
 */

// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数，函数接收 grunt 

module.exports = grunt => {

  // // 注册任务
  // grunt.registerTask('foo', ()=>{
  //   console.log('hello grunt')
  // })

  // grunt.registerTask('bar', '任务描述', () => {
  //   console.log('bar')
  // })

  // // 默认任务
  // // grunt.registerTask('default', ()=>{
  // //   console.log('default task')
  // // })

  // // 默认执行多个任务
  // grunt.registerTask('default', ['foo', 'bar'])

  // // 未告知 grunt 异步任务结束
  // // grunt.registerTask('async-task', () => {
  // //   setTimeout(()=>{
  // //     console.log('async-task')
  // //   },1000)
  // // })

  // // 异步任务结束标记
  // grunt.registerTask('async-task', function() {
  //   const done = this.async();
  //   setTimeout(()=>{
  //     console.log('async-task')
  //     done();
  //   },1000)
  // })


  // // 标记同步任务失
  // grunt.registerTask('foo', ()=>{
  //   console.log('hello grunt')
  //   return false; // 标记失败
  // })

  // grunt.registerTask('bar', '任务描述', () => {
  //   console.log('bar')
  // })

  // // 默认执行多个任务
  // grunt.registerTask('default', ['foo', 'bar'])


  // // 标记异步任务失败
  // grunt.registerTask('async-task', function() {
  //   const done = this.async();
  //   setTimeout(()=>{
  //     console.log('async-task')
  //     done(false); // 标记失败
  //   },1000)
  // })


  // grunt.initConfig({
  //   foo: 'foo',
  //   bar: {
  //     name: 'bar'
  //   }
  // })

  // // 任务的配置
  // grunt.registerTask('foo', ()=>{
  //   const fooConf = grunt.config('foo');
  //   console.log('hello grunt')
  //   console.log('fooConf',fooConf)
  // })

  // grunt.registerTask('bar', '任务描述', () => {
  //   const barConf = grunt.config('bar');
  //   console.log('bar')
  //   console.log('barConf',barConf)
  // })

  // grunt.registerTask('default', ['foo', 'bar'])


  // 多目标任务
  // grunt.initConfig({
  //   build:{
  //     options: {
  //       name: 'buildName'
  //     },
  //     foo: 'foo',
  //     bar: {
  //       options: {
  //         name: 'barName'
  //       },
  //       text: 'barText'
  //     }
  //   }
  // })
  
  // grunt.registerMultiTask('build', function() {
  //   console.log(this.options());
  //   console.log(`target: ${this.target}, data: ${this.data}`);
  // })


  // // 加载插件任务
  // grunt.initConfig({
  //   clean: {
  //     temp: 'temp/*' // 指定要清除的文件路径
  //   }
  // })

  // grunt.loadNpmTasks('grunt-contrib-clean');

  // sass 插件
  // const sass = require('sass');
  // grunt.initConfig({
  //   sass: {
  //     options: {
  //       sourceMap:true, 
  //       implementation: sass
  //     },
  //     main: {
  //       files: {
  //         'dist/css/mian.css': 'src/scss/main.scss'
  //       }
  //     }
  //   }
  // })

  // grunt.loadNpmTasks('grunt-sass');


  // // babel 插件
  // const loadGruntTasks = require('load-grunt-tasks');
  // grunt.initConfig({
  //   babel: {
  //     options: {
  //       // sourceMap: true,
  //       presets: ['@babel/preset-env']
  //     },
  //     main: {
  //       files: {
  //         'dist/js/app.js': 'src/js/app.js'
  //       }
  //     }
  //   },
  // })
  // loadGruntTasks(grunt);

  // grunt 监听文件变换，执行任务
  const sass = require('sass');
  const loadGruntTasks = require('load-grunt-tasks');
  grunt.initConfig({
    sass: {
      options: {
        sourceMap:true, 
        implementation: sass
      },
      main: {
        files: {
          'dist/css/mian.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })
  
  loadGruntTasks(grunt);

  grunt.registerTask('default', ['sass', 'babel', 'watch']);
}