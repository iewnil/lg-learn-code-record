/*
 * @Description: 
 * @Date: 2021-10-17 16:54:44
 * @LastEditTime: 2021-10-24 16:15:30
 * @LastEditors: linwei
 */
// import cac from 'cac';
// import ora from 'ora';
// import m2i from '.';
// import { name, version } from '../package.json';

const cac = require('cac');
const ora = require('ora');
const m2i = require('.');
const { name, version } = require('../package.json')
const cli = cac(name); // 传入参数可指定cli 命令名称，默认为命令第一个字符串

const onError = (err) => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

cli
  .command( '<inputFile>', 'the markdown file to image')
  .option('-O, --output <output>', 'image output path')
  .action((input, options) => {
    // 获取到命令的内容以及选项内容
    const { output } = options;
    
    if (typeof output !== 'string' && typeof output !== 'undefined') {
      throw new TypeError(`Expected output is a string, got ${typeof output}`)
    }

    const start = Date.now()
    const spinner = ora('generating...').start() // 终端显示加载状态

    m2i(input,{ output })
      .then(res=> {
        // 终端结束加载状态
        spinner.succeed(
          `generated → ${((Date.now() - start) / 1000).toFixed(2)}`
        )
      })
      .catch(err => {
        spinner.fail(err.message)
      })
  })
  
  cli.help().version(version).parse() // 不能缺少，调用parse，才能成功获取解析命令