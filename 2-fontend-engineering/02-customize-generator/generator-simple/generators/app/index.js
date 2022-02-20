/*
 * @Description: generator 的核心入口
 * @Date: 2021-08-14 10:58:03
 * @LastEditTime: 2021-08-14 17:53:50
 * @LastEditors: linwei
 */

// 需要导出一个继承自 Yeoman Generator基类 的类
// Yeoman Generator 在工作时，会自动调用类中定义的一些生命周期方法
// 我们可以在这些方法中，调用基类提供的一些工具方法实现一些功能，例如：文件写入

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  // Yeoman 在询问用户环节会自动调用此方法
  prompting() {
    /**
     * 调用基类的 prompt() 方法，发出对用户的命令行提问
     * 将 promise 返回
     * 参数接收一个提问的数组
     */
    return this.prompt([
      { 
        type: 'input', // 取值的方式是输入
        name: 'title', // 值对应的key
        message: 'Your title', // 问题的提示
        default: this.appname, // 默认值，appname 为项目生成的目录名称
      },
      { 
        type: 'input', // 取值的方式是输入
        name: 'success', // 值对应的key
        message: 'Your success', // 问题的提示
        default: true,
      }
    ])
    .then(answers => {
      // answers => { name: '用户输入的值'}
      this.answers = answers;
    })
  }

  // Yeoman 自动在生成文件阶段调用此方法
  writing() {
    // // 1.我们可以在这里尝试在生成的项目中写入文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )

    // 2.我们也可以通过拷贝模板文件的方式在项目中写入模板文件
    // 模板文件路径
    const template = this.templatePath('foo.txt');
    // 输出目录路径
    const output = this.destinationPath('foo.txt');
    // 模板数据上下文，可在模板文件中用 EJS 模板语法识别
    // const context = { title: 'hello customize genrator', success: true};
    const context = this.answers;
    // 拷贝
    this.fs.copyTpl(template, output, context);
  }

}

