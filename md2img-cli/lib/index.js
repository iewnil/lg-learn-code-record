/*
 * @Description: 命令行交互逻辑
 * @Date: 2021-10-18 22:08:52
 * @LastEditTime: 2021-10-24 17:00:05
 * @LastEditors: linwei
 */
// import fs from 'fs/promises'
// import path from 'path';
// import marked from 'marked';
// import puppeteer from 'puppeteer';
// import { cosmiconfig } from 'cosmiconifg';
// import { name } from '../package.json';
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const puppeteer = require('puppeteer');
const { cosmiconfig } = require('cosmiconfig');
const { name } = require('../package.json')

module.exports = async (input, options) => {
  try {
    // 解析 md 文件路径，相当于 path.resolve(process.cwd(), input)
    const filename = path.resolve(input);  
    // 图片输出路径
    const output = path.resolve(options.output);

    // 判断文件类型
    const stat = fs.statSync(filename)

    if(stat.isDirectory()) {
      throw Error('expect to file path, but got a directory.')
    }

    if(!stat.isFile()) {
      throw Error('expect to file, but got unknow.')
    }

    // 读取文件内容，将文件内容转为 html
    const md = fs.readFileSync(filename,'utf-8');
    const content = marked(md);

    // 根据 package.json 指定的 cli 名称匹配搜索对应的配置文件
    const explorer = cosmiconfig(name)
    const { config = {} } = await explorer.search(process.cwd()) || {};
    // 根据配置文件提供的 html 模板，将占位替换为 md 内容
    const html = config.html.replace(/{{content}}/, content);

    // 启动浏览器，渲染 html，并输出快照，最后关闭浏览器
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.screenshot({ path: output, fullPage: true });
    await browser.close();
    
  } catch (e) {
    console.log('ee',e)
  }
}