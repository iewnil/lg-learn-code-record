/*
 * @Description:  默认配置项
 * @Date: 2021-09-04 15:59:15
 * @LastEditTime: 2021-09-04 17:55:44
 * @LastEditors: linwei
 */

const config = {
  src: 'src',
  public: 'public',
  scss: '/assets/styles/*.scss',
  js: '/assets/scripts/*.js',
  images: '/assets/images/**',
  fonts: '/assets/fonts/**',
  output: {
    path: 'dist',
    sourceDir: false,
  },
  tempOutput: {
    path: 'temp',
    sourceDir: false,
  },
  devServer: {
    port: 8888,
    open: false,
    notify: false,
  },
  swigData: {
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
    pkg: require('../package.json'),
    date: new Date()
  }
}

module.exports = config;
