/*
 * @Description: 
 * @Date: 2021-12-03 00:01:25
 * @LastEditTime: 2021-12-04 16:19:12
 * @LastEditors: linwei
 */
import express from 'express';

const app = express();

// 将 dist 作为静态资源文件夹，这样在浏览器访问根路径 bundle.js 时
// 服务端 server 在静态资源文件夹中查找并返回
app.use(express.static('dist'));

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id='root'></div>
      <script src="bundle.js"></script>
    </body>
  </html>
`

app.get('*', (req, res) => {
  res.send(template);
})

app.listen(3000, () => console.log('server is running at port 3000'))